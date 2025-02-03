# Variables
MINT_ACC := $(shell dfx ledger account-id)
LEDGER_ACC := $(shell dfx ledger account-id)
ARCHIVE_CONTROLLER := $(shell dfx identity get-principal)
OWNER := $(shell dfx identity get-principal)
TOKEN_NAME := ICP

GAME_BLOC_WASM := target/wasm32-unknown-unknown/release/game_bloc_backend.wasm

CANDID_FILE := game_bloc_backend/game_bloc_backend.did


# Targets

# Default target: build and deploy everything
all: build deploy

# Build the Rust project using Cargo
build:
	@echo ">> Building ledger"
	@dfx identity remove minter
	@dfx identity new minter
	@dfx identity use minter
	@export MINT_ACC=$(MINT_ACC)
	@dfx identity use default
	@export OWNER=$(OWNER) && export LEDGER_ACC=$(LEDGER_ACC) && export ARCHIVE_CONTROLLER=$(ARCHIVE_CONTROLLER) && \

	cargo build --release --target wasm32-unknown-unknown --package game_bloc_backend

# Generate Candid file from the built WASM
candid:
	@echo ">> Generating Candid file"
	@candid-extractor $(GAME_BLOC_WASM) > $(CANDID_FILE)

# Deploy the various canisters
deploy: candid
	@echo ">> Deploying icp_ledger"
	@dfx deploy icp_ledger --argument "(variant {Init =record {minting_account = \"$(MINT_ACC)\"; \
	initial_values = vec { record { \"$(LEDGER_ACC)\"; record { e8s=100_000_000_000 } } } ; \
	archive_options = opt record {num_blocks_to_archive = 1000000; trigger_threshold = 1000000; controller_id = principal  \"$(ARCHIVE_CONTROLLER)\"; }; \
	send_whitelist = vec {}}})" --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai

	@echo ">> Deploying icp_index"
	@dfx deploy icp_index --specified-id qhbym-qaaaa-aaaaa-aaafq-cai --argument '(record {ledger_id = principal "ryjl3-tyaaa-aaaaa-aaaba-cai"})'

	@echo ">> Deploying ckbtc_ledger"
	@dfx deploy --network local --specified-id mxzaz-hqaaa-aaaar-qaada-cai ckbtc_ledger --argument \
	'(variant { Init = record { token_name = "Local ckBTC"; token_symbol = "LCKBTC"; minting_account = record { owner = principal "$(OWNER)"; }; \
	initial_balances = vec { record { record { owner = principal "$(OWNER)"; }; 100_000_000_000; } }; metadata = vec {}; transfer_fee = 10; \
	archive_options = record { trigger_threshold = 2000; num_blocks_to_archive = 1000; controller_id = principal "$(OWNER)"; } }}})'

	@echo ">> Deploying ckbtc_index"
	@dfx deploy --network local ckbtc_index --argument \
	'record { ledger_id = (principal "mxzaz-hqaaa-aaaar-qaada-cai"); }'

	@echo ">> Deploying cketh_ledger"

	@dfx deploy --network local --specified-id ss2fx-dyaaa-aaaar-qacoq-cai cketh_ledger --argument \

	'(variant { Init = record { token_name = "Local ckETH"; token_symbol = "LCKETH"; minting_account = record { owner = principal "$(OWNER)"; }; \
	initial_balances = vec { record { record { owner = principal "$(OWNER)"; }; 100_000_000_000; } }; metadata = vec {}; transfer_fee = 10; \
	archive_options = record { trigger_threshold = 2000; num_blocks_to_archive = 1000; controller_id = principal "$(OWNER)"; } }}})'

	@echo ">> Deploying cketh_index"
	@dfx deploy --network local cketh_index --argument \
	'record { ledger_id = (principal "ss2fx-dyaaa-aaaar-qacoq-cai"); }'

	@echo ">> Final dfx deploy"
	@dfx deploy

clean:
	@echo ">> Cleaning up build artifacts"
	@cargo clean
	@rm -f $(CANDID_FILE)

