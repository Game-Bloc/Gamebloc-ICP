import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Buffer "mo:base/Buffer";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Order "mo:base/Order";
import Debug "mo:base/Debug";
import Int "mo:base/Int";

shared({ caller = creator }) actor class AssetCanister() = this {

    // ========== TYPE DEFINITIONS ==========
    public type AssetId = Text;
    public type AssetCategory = {
        #ProfilePicture;
        #TournamentBanner;
        #PostMedia;
        #ThreadAttachment;
        #GameAsset;
        #Other : Text;
    };

    public type AssetVisibility = {
        #Public;
        #Private;
        #Restricted : [Principal]; // Specific principals who can access
    };

    public type AssetMetadata = {
        name : Text;
        description : ?Text;
        tags : [Text];
        createdAt : Int; // Timestamp
        modifiedAt : Int;
        category : AssetCategory;
        fileType : Text;
        size : Nat;
        dimensions : ?(Nat, Nat); // width, height for images/videos
        duration : ?Nat; // in seconds for audio/video
    };

    public type Asset = {
        id : AssetId;
        owner : Principal;
        chunks : [Blob];
        visibility : AssetVisibility;
        metadata : AssetMetadata;
    };

    public type AssetUploadState = {
        uploadedChunks : Nat;
        totalSize : Nat;
        isComplete : Bool;
    };

    public type AssetPreview = {
        id : AssetId;
        metadata : AssetMetadata;
        thumbnail : ?Blob; // Small preview for images/videos
    };

    // ========== STATE VARIABLES ==========
    private stable var nextAssetId : Nat = 1;
    private stable var assets : [(AssetId, Asset)] = [];
    private stable var uploadStates : [(Principal, [(AssetId, AssetUploadState)])] = [];
    
    private var assetsMap = HashMap.fromIter<AssetId, Asset>(
        assets.vals(), 0, Text.equal, Text.hash
    );

    // First create an empty map
    private var uploadStatesMap = HashMap.HashMap<Principal, HashMap.HashMap<AssetId, AssetUploadState>>(
    0, Principal.equal, Principal.hash
    );

    // Then populate it from stable data
    for ((principal, entries) in uploadStates.vals()) {
        let innerMap = HashMap.HashMap<AssetId, AssetUploadState>(
            0, Text.equal, Text.hash
        );
        for ((assetId, state) in entries.vals()) {
            innerMap.put(assetId, state);
        };
        uploadStatesMap.put(principal, innerMap);
    };


    
  
    // ========== ASSET UPLOAD & MANAGEMENT ==========
    public shared({ caller }) func initiateUpload(
        metadata : {
            name : Text;
            description : ?Text;
            tags : [Text];
            category : AssetCategory;
            fileType : Text;
            visibility : AssetVisibility;
            expectedSize : Nat;
            dimensions : ?(Nat, Nat);
            duration : ?Nat;
        }
    ) : async Result.Result<AssetId, Text> {
        let assetId = generateAssetId(caller);
        
        let newAsset : Asset = {
            id = assetId;
            owner = caller;
            chunks = [];
            visibility = metadata.visibility;
            metadata = {
                name = metadata.name;
                description = metadata.description;
                tags = metadata.tags;
                createdAt = Time.now();
                modifiedAt = Time.now();
                category = metadata.category;
                fileType = metadata.fileType;
                size = 0;
                dimensions = metadata.dimensions;
                duration = metadata.duration;
            };
        };
        
        assetsMap.put(assetId, newAsset);
        
        let uploadState : AssetUploadState = {
            uploadedChunks = 0;
            totalSize = metadata.expectedSize;
            isComplete = false;
        };
        
        let userUploads = switch (uploadStatesMap.get(caller)) {
            case null {
                let newMap = HashMap.HashMap<AssetId, AssetUploadState>(1, Text.equal, Text.hash);
                uploadStatesMap.put(caller, newMap);
                newMap;
            };
            case (?map) map;
        };
        
        userUploads.put(assetId, uploadState);
        
        #ok(assetId);
    };

    public shared({ caller }) func uploadChunk(
        assetId : AssetId,
        chunk : Blob,
        chunkIndex : Nat
    ) : async Result.Result<(), Text> {
        switch (assetsMap.get(assetId)) {
            case null { #err("Asset not found") };
            case (?asset) {
                if (asset.owner != caller) {
                    return #err("Unauthorized");
                };
                
                // Check if chunk already exists
                if (chunkIndex < asset.chunks.size()) {
                    return #err("Chunk already uploaded");
                };
                
                // Add chunk to asset
                let updatedChunks = Array.append(asset.chunks, [chunk]);
                let newSize = asset.metadata.size + chunk.size();
                
                let updatedAsset : Asset = {
                    asset with
                    chunks = updatedChunks;
                    metadata = {
                        asset.metadata with
                        size = newSize;
                        modifiedAt = Time.now();
                    };
                };
                
                assetsMap.put(assetId, updatedAsset);
                
                // Update upload state
                switch (uploadStatesMap.get(caller)) {
                    case null { #err("Upload state not found") };
                    case (?userUploads) {
                        switch (userUploads.get(assetId)) {
                            case null { #err("Upload not initiated") };
                            case (?state) {
                                let updatedState = {
                                    state with
                                    uploadedChunks = state.uploadedChunks + 1;
                                    isComplete = newSize >= state.totalSize;
                                };
                                
                                userUploads.put(assetId, updatedState);
                                
                                // If upload is complete, clean up the upload state
                                if (updatedState.isComplete) {
                                    ignore userUploads.remove(assetId);
                                };
                                
                                #ok(());
                            };
                        };
                    };
                };
            };
        };
    };

    public shared({ caller }) func completeUpload(assetId : AssetId) : async Result.Result<(), Text> {
        switch (uploadStatesMap.get(caller)) {
            case null { #err("No uploads in progress") };
            case (?userUploads) {
                switch (userUploads.get(assetId)) {
                    case null { #err("Upload not found") };
                    case (?state) {
                        ignore userUploads.remove(assetId);
                        #ok(());
                    };
                };
            };
        };
    };

    // ========== ASSET RETRIEVAL ==========
    public shared({ caller }) func getAsset(assetId : AssetId) : async Result.Result<Asset, Text> {
        switch (assetsMap.get(assetId)) {
            case null { #err("Asset not found") };
            case (?asset) {
                if (not checkAccess(caller, asset)) {
                    return #err("Access denied");
                };
                
                #ok(asset);
            };
        };
    };

    public shared({ caller }) func getAssetChunk(
        assetId : AssetId,
        chunkIndex : Nat
    ) : async Result.Result<Blob, Text> {
        switch (assetsMap.get(assetId)) {
            case null { #err("Asset not found") };
            case (?asset) {
                if (not checkAccess(caller, asset)) {
                    return #err("Access denied");
                };
                
                if (chunkIndex >= asset.chunks.size()) {
                    return #err("Chunk index out of bounds");
                };
                
                #ok(asset.chunks[chunkIndex]);
            };
        };
    };

    public query func getAssetMetadata(assetId : AssetId) : async Result.Result<AssetMetadata, Text> {
        switch (assetsMap.get(assetId)) {
            case null { #err("Asset not found") };
            case (?asset) {
                #ok(asset.metadata);
            };
        };
    };

    public shared({ caller }) func getAssetPreviews(
        category : ?AssetCategory,
        page : Nat,
        pageSize : Nat
    ) : async [AssetPreview] {
        let filtered = Iter.filter(assetsMap.vals(), func(asset : Asset) : Bool {
            (asset.owner == caller or isPublicOrRestricted(caller, asset)) and
            (switch (category) {
                case null { true };
                case (?cat) { asset.metadata.category == cat };
            })
        });
        
        let sorted = Iter.sort(filtered, func(a : Asset, b : Asset) : Order.Order {
            Int.compare(b.metadata.createdAt, a.metadata.createdAt)
        });
        
        let paginated = Buffer.Buffer<AssetPreview>(pageSize);
        var count = 0;
        
        for (asset in sorted) {
            if (count >= page * pageSize and count < (page + 1) * pageSize) {
                paginated.add({
                    id = asset.id;
                    metadata = asset.metadata;
                    thumbnail = generateThumbnail(asset);
                });
            };
            count += 1;
        };
        
        Buffer.toArray(paginated);
    };

    // ========== ASSET MANAGEMENT ==========
    public shared({ caller }) func updateAssetMetadata(
        assetId : AssetId,
        updates : {
            name : ?Text;
            description : ?Text;
            tags : ?[Text];
            visibility : ?AssetVisibility;
            dimensions : ?(Nat, Nat);
            duration : ?Nat;
        }
    ) : async Result.Result<(), Text> {
        switch (assetsMap.get(assetId)) {
            case null { #err("Asset not found") };
            case (?asset) {
                if (asset.owner != caller) {
                    return #err("Unauthorized");
                };

                let updatedMetadata : AssetMetadata = {
                    name = asset.metadata.name;
                    description = switch (updates.description) {
                        case null { asset.metadata.description };
                        case (?desc) { ?desc };
                    };
                    tags = switch (updates.tags) {
                        case null { asset.metadata.tags };
                        case (?newTags) { newTags };
                    };
                    createdAt = asset.metadata.createdAt;
                    modifiedAt = Time.now(); // Changed to Int (timestamp)
                    category = asset.metadata.category;
                    fileType = asset.metadata.fileType;
                    size = asset.metadata.size;
                    dimensions = switch (updates.dimensions) {
                        case null { asset.metadata.dimensions };
                        case (?dims) { ?dims };
                    };
                    duration = switch (updates.duration) {
                        case null { asset.metadata.duration };
                        case (?dur) { ?dur };
                    };
                };
                
                
                let updatedAsset = {
                    asset with
                    metadata = updatedMetadata;
                    visibility = Option.get(updates.visibility, asset.visibility);
                };
                
                assetsMap.put(assetId, updatedAsset);
                #ok(());
            };
        };
    };

// createdAt = asset.metadata.createdAt; // Keep original createdAt
                    // category = asset.metadata.category; // Keep original category
                    // fileType = asset.metadata.fileType; // Keep original fileType
                    // size = asset.metadata.size;
    public shared({ caller }) func deleteAsset(assetId : AssetId) : async Result.Result<(), Text> {
        switch (assetsMap.get(assetId)) {
            case null { #err("Asset not found") };
            case (?asset) {
                if (asset.owner != caller and caller != creator) {
                    return #err("Unauthorized");
                };
                
                ignore assetsMap.remove(assetId);
                #ok(());
            };
        };
    };

    // ========== CATEGORY-SPECIFIC HELPERS ==========
    public shared({ caller }) func setProfilePicture(imageAssetId : AssetId) : async Result.Result<(), Text> {
        switch (assetsMap.get(imageAssetId)) {
            case null { #err("Asset not found") };
            case (?asset) {
                if (asset.owner != caller) {
                    return #err("Unauthorized");
                };
                
                if (asset.metadata.category != #ProfilePicture) {
                    return #err("Asset must be a profile picture");
                };
                
                // In a real implementation, this would update the user's profile in the main canister
                #ok(());
            };
        };
    };

    private func arrayContains<T>(array : [T], item : T, equal : (T, T) -> Bool) : Bool {
        for (x in array.vals()) {
            if (equal(x, item)) {
                return true;
            }
        };
        false
    };

    public shared({ caller }) func getTournamentBanners(tournamentId : Text) : async [AssetPreview] {
        let filtered = Iter.filter(assetsMap.vals(), func(asset : Asset) : Bool {
            asset.metadata.category == #TournamentBanner and
            arrayContains(asset.metadata.tags, (tournamentId), Text.equal)  and
            isPublicOrRestricted(caller, asset)
        });
        
        Iter.toArray(Iter.map(filtered, func(asset : Asset) : AssetPreview {
            {
                id = asset.id;
                metadata = asset.metadata;
                thumbnail = generateThumbnail(asset);
            }
        }));
    };

    // ========== HELPER FUNCTIONS ==========
    func generateAssetId(owner : Principal) : AssetId {
        let id = Nat.toText(nextAssetId);
        nextAssetId += 1;
        Principal.toText(owner) # "-" # id
    };

    func checkAccess(caller : Principal, asset : Asset) : Bool {
        asset.owner == caller or
        asset.visibility == #Public or
        (switch (asset.visibility) {
            case (#Restricted(principals)) { Array.find(principals, func(p : Principal) : Bool { p == caller }) != null };
            case _ { false };
        })
    };

    func isPublicOrRestricted(caller : Principal, asset : Asset) : Bool {
        asset.visibility == #Public or
        (switch (asset.visibility) {
            case (#Restricted(principals)) { Array.find(principals, func(p : Principal) : Bool { p == caller }) != null };
            case _ { false };
        })
    };

    func generateThumbnail(asset : Asset) : ?Blob {
        // In a real implementation, this would generate thumbnails for images/videos
        null
    };

    // ========== SYSTEM FUNCTIONS ==========
    // system func preupgrade() {
    //     assets := Iter.toArray(assetsMap.entries());
    //     uploadStates := Iter.toArray(
    //         Iter.map(
    //             uploadStatesMap.entries(),
    //             func((principal, map) : (Principal, [(AssetId, AssetUploadState)])) {
    //                 (principal, Iter.toArray(map.entries()))
    //         )
    //     );
    // };

    system func postupgrade() {
        assets := [];
        uploadStates := [];
    };
};