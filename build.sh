#!/bin/sh

echo ">> Building ledger"

dfx identity remove minter
dfx identity new minter
dfx identity use minter
MINT_ACC=$(dfx ledger account-id)
export MINT_ACC


dfx identity use default

export OWNER=$(dfx identity get-principal)

LEDGER_ACC=$(dfx ledger account-id)
export LEDGER_ACC

ARCHIVE_CONTROLLER=$(dfx identity get-principal)
export ARCHIVE_CONTROLLER

export TOKEN_NAME="ICP"

 candid-extractor target/wasm32-unknown-unknown/release/game_bloc_backend.wasm > game_bloc_backend/game_bloc_backend.did


cargo build --release --target wasm32-unknown-unknown --package game_bloc_backend 

# dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai icrc2_allowance "(record { 
#   account = ( record { 
#     owner = (principal \"${DEFAULT}\")
#   }); 
#   spender = ( record { 
#     owner = (principal \"${ADMIN}\")
#   }); 
   
# })"

# dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai icrc2_transfer_from "(record {
#   from = (record {
#         owner=(principal "${DEFAULT}")
#   }); 
#   to = (record {
#         owner=(principal "${ADMIN}")
#   });
#   amount = 90_000;
# })"

# dfx canister call ryjl3-tyaaa-aaaaa-aaaba-cai icrc2_approve "(record {
#   amount = 100_000; 
#   spender = record{
#     owner = principal \"${ADMIN}\";
#   } 
# })"


dfx deploy icp_ledger --argument "(variant {Init =record {minting_account = \"${MINT_ACC}\";
initial_values = vec { record {  \"${LEDGER_ACC}\";
record { e8s=100_000_000_000 } } } ; archive_options = opt record {num_blocks_to_archive = 1000000; trigger_threshold = 1000000; \
  controller_id = principal  \"${ARCHIVE_CONTROLLER}\"; }; send_whitelist = vec {}}})" --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai


dfx deploy icp_index --specified-id qhbym-qaaaa-aaaaa-aaafq-cai --argument '(record {ledger_id = principal "ryjl3-tyaaa-aaaaa-aaaba-cai"})'

# dfx canister --network local call icp_ledger icr1_transfer '
#     (record {
#       to=(record {
#         owner=(principal "6cxww-biaaa-aaaal-adebq-cai")
#         });
#         amount=500_000
#     })'

# --specified-id ryjl3-tyaaa-aaaaa-aaaaa-cai
# dfx deploy --network local  icrc1_ledger --argument '
#   (variant {
#     Init = record {
#       token_name = "Local ICP";
#       token_symbol = "LICP";
#       minting_account = record {
#         owner = principal "'${OWNER}'";
#       };
#       initial_balances = vec {
#         record {
#           record {
#             owner = principal "'${OWNER}'";
#           };
#           100_000_000_000;
#         };
#       };
#       metadata = vec {};
#       transfer_fee = 10;
#       archive_options = record {
#         trigger_threshold = 2000;
#         num_blocks_to_archive = 1000;
#         controller_id = principal "'${OWNER}'";
#       }
#     }
#   })
# '

dfx deploy --network local --specified-id mxzaz-hqaaa-aaaar-qaada-cai ckbtc_ledger --argument '
  (variant {
    Init = record {
      token_name = "Local ckBTC";
      token_symbol = "LCKBTC";
      minting_account = record {
        owner = principal "'${OWNER}'";
      };
      initial_balances = vec {
        record {
          record {
            owner = principal "'${OWNER}'";
          };
          100_000_000_000;
        };
      };
      metadata = vec {};
      transfer_fee = 10;
      archive_options = record {
        trigger_threshold = 2000;
        num_blocks_to_archive = 1000;
        controller_id = principal "'${OWNER}'";
      }
    }
  })
'

# dfx deploy ckbtc_index --specified-id n5wcd-faaaa-aaaar-qaaea-cai --argument '(record {ledger_id = principal "mxzaz-hqaaa-aaaar-qaada-cai"})'

dfx deploy --network local ckbtc_index --argument '
  record {
   ledger_id = (principal "mxzaz-hqaaa-aaaar-qaada-cai");
  }
'


dfx deploy --network local --specified-id ss2fx-dyaaa-aaaar-qacoq-cai cketh_ledger --argument '
  (variant {
    Init = record {
      token_name = "Local ckETH";
      token_symbol = "LCKETH";
      minting_account = record {
        owner = principal "'${OWNER}'";
      };
      initial_balances = vec {
        record {
          record {
            owner = principal "'${OWNER}'";
          };
          100_000_000_000;
        };
      };
      metadata = vec {};
      transfer_fee = 10;
      archive_options = record {
        trigger_threshold = 2000;
        num_blocks_to_archive = 1000;
        controller_id = principal "'${OWNER}'";
      }
    }
  })
'

dfx deploy --network local cketh_index --argument '
  record {
   ledger_id = (principal "ss2fx-dyaaa-aaaar-qacoq-cai");
  }
'


dfx deploy

#  "system_api": {
#       "candid": "system_api/vetkd_system_api.did",
#       "type": "rust",
#       "package": "vetkd_system_api"
#     },

