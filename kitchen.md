"evm_rpc": {
      "candid": "https://github.com/internet-computer-protocol/evm-rpc-canister/releases/latest/download/evm_rpc.did",
      "declarations": {
        "output": "src/evm_rpc/declarations"
      },
      "init_arg": "(record { nodesInSubnet = 28 })",
      "remote": {
        "candid": "packages/evm_rpc/declarations/evm_rpc.did",
        "id": {
          "ic": "7hfb6-caaaa-aaaar-qadga-cai"
        }
      },
      "specified_id": "7hfb6-caaaa-aaaar-qadga-cai",
      "type": "custom",
      "wasm": "https://github.com/internet-computer-protocol/evm-rpc-canister/releases/latest/download/evm_rpc.wasm.gz"
    },