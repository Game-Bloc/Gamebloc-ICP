#!/bin/bash

echo ">> Building ledger"

dfx identity remove minter
dfx identity new minter
dfx identity use minter
MINT_ACC=$(dfx ledger account-id)
export MINT_ACC

dfx identity use deon

export OWNER=$(dfx identity get-principal)

LEDGER_ACC=$(dfx ledger account-id)
export LEDGER_ACC

ARCHIVE_CONTROLLER=$(dfx identity get-principal)
export ARCHIVE_CONTROLLER

export TOKEN_NAME="ICP"

 candid-extractor target/wasm32-unknown-unknown/release/game_bloc_backend.wasm > game_bloc_backend/game_bloc_backend.did


cargo build --release --target wasm32-unknown-unknown --package game_bloc_backend 

dfx deploy icp_ledger --argument "(variant {Init =record {minting_account = \"${MINT_ACC}\";
initial_values = vec { record {  \"${LEDGER_ACC}\";
record { e8s=100_000_000_000 } } } ; archive_options = opt record {num_blocks_to_archive = 1000000; trigger_threshold = 1000000; \
  controller_id = principal  \"${ARCHIVE_CONTROLLER}\"; }; send_whitelist = vec {}}})" --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai

dfx deploy icp_index --specified-id qhbym-qaaaa-aaaaa-aaafq-cai --argument '(record {ledger_id = principal "ryjl3-tyaaa-aaaaa-aaaba-cai"})'

# dfx canister --network local call icp_ledger icr1_transfer '
#     (record {
#       to=(record {
#         owner=(principal "b77ix-eeaaa-aaaaa-qaada-cai")
#         });
#         amount=500_000
#     })'

# dfx ledger transfer --amount 500_000 --memo 123 476653ac80a51b906bcc24f5ce59c1c6b4290d8dddc7ac6fae4a4b5070cf5abd

# dfx identity use DevJourney
# dfx canister call icp_ledger icrc1_transfer "(record { to = record { owner = principal \"b77ix-eeaaa-aaaaa-qaada-cai\";};  amount = 1_000_000;})"

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


# dfx deploy --network=ic         canister update-settings kitchen --add-controller ltmcx-2y32p-k3cxj-oe7mh-zplyh-mg7j2-w5756-qajf5-l6y47-be56z-nqe --network=ic2024-10-03 21:07:49.875732 UTC: [Canister bd3sg-teaaa-aaaaa-qaaba-cai] 20[ic-icrc1-index] Indexed: 0 waiting : 22
# 4-10-03 21:07:49.875732 UTC: [Canister be2us-64aaa-aaaaa-qaabq-cai]

# MOPS_VERSION=1.0.0 sh -ci "$(curl -fsSL cli.mops.one/install.sh | sh)"
