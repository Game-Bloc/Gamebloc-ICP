#!/bin/sh

echo ">> Building ledger"

dfx identity remove minter
dfx identity new minter
dfx identity use minter
MINT_ACC=$(dfx ledger account-id)
export MINT_ACC

dfx identity use default
LEDGER_ACC=$(dfx ledger account-id)
export LEDGER_ACC

ARCHIVE_CONTROLLER=$(dfx identity get-principal)
export ARCHIVE_CONTROLLER

export TOKEN_NAME="ICP"


dfx deploy icp_ledger --argument "(variant {Init =record {minting_account = \"${MINT_ACC}\";
initial_values = vec { record {  \"${LEDGER_ACC}\";
record { e8s=100_000_000_000 } } } ; archive_options = opt record {num_blocks_to_archive = 1000000; trigger_threshold = 1000000; \
  controller_id = principal  \"${ARCHIVE_CONTROLLER}\"; }; send_whitelist = vec {}}})" --specified-id ryjl3-tyaaa-aaaaa-aaaba-cai

dfx deploy icp_index --specified-id qhbym-qaaaa-aaaaa-aaafq-cai --argument '(record {ledger_id = principal "ryjl3-tyaaa-aaaaa-aaaba-cai"})'

dfx canister --network local call icp_ledger icr1_transfer '
    (record {
      to=(record {
        owner=(principal "6cxww-biaaa-aaaal-adebq-cai")
        });
        amount=500_000
    })'

dfx deploy

