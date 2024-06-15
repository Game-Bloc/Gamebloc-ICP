# GameBloc

GameBloc is the first decentralized platform built on the ICP blockchain for hosting game tournaments. It allows users to create and participate in tournaments that can either be crowdfunded (individually hosted tournaments) or prepaid (funded by a sponsor or gaming company). The platform provides a seamless and secure environment for gamers to compete, win prizes, and gain recognition.

## Features

- **Decentralized Tournaments**: Host and participate in game tournaments on a decentralized platform.
- **Crowdfunded Tournaments**: Create tournaments with entry fees where the prize pool is formed by the participants.
- **Prepaid Tournaments**: Gaming companies or sponsors  can fund tournaments to promote their gaming apps.
- **Fair Prize Distribution**: The prize pool is shared among the winners based on predefined rules and percentages.
- **Real-Time Updates**: Stay updated with tournament progress and results in real-time.

## Prerequisites

To run GameBloc locally, you need the following:

- [Internet Identity](https://github.com/dfinity/internet-identity) for authentication.
- [ic-websocket](https://github.com/omnia-network/ic-websocket-gateway) for real-time updates.
- [Node.js](https://nodejs.org/) for frontend dependencies.
- [Dfinity SDK (dfx)](https://smartcontracts.org/docs/developers-guide/cli-reference.html) for deploying canisters.
- [Rust](https://www.rust-lang.org/) for Rust canister development.

## Installation

1. **Clone Repositories**:
    ```sh
    git clone https://github.com/dfinity/internet-identity.git
    git clone https://github.com/omnia-network/ic-websocket-gateway.git
    git clone https://github.com/Game-Bloc/Gamebloc-ICP.git
    ```

2. **Setup Internet Identity**:
    ```sh
    cd internet-identity/demos/using-dev-build
    dfx deploy
    ```

3. **Setup ic-websocket**:
    ```sh
    cd ic-websocket-gateway
    cargo run
    ```

4. **Setup GameBloc**:
    ```sh
    cd Gamebloc-ICP
    npm install
    ```

5. **Start Local Development Environment**:
    ```sh
    dfx start --background --clean
    ./build.sh
    ```

## Usage

### Creating a Tournament

1. Navigate to the GameBloc web interface.
2. Authenticate using Internet Identity.
3. Select "Create Tournament".
4. Fill in the tournament details including entry fee, prize distribution, and rules.
5. Publish the tournament and share it with potential participants.

### Participating in a Tournament

1. Browse the available tournaments on GameBloc.
2. Select a tournament and review the details.
3. Pay the entry fee using the supported payment method.
4. Compete in the tournament and track your progress in real-time.

## License

This project is licensed under the AGPL License. See the [LICENSE](https://www.gnu.org/licenses/agpl-3.0.en.html#license-text) file for details.

## Acknowledgements

- [Dfinity Foundation](https://dfinity.org/)
- [Internet Identity](https://github.com/dfinity/internet-identity)
- [ic-websocket](https://github.com/omnia-network/ic-websocket-gateway)

---

We hope you enjoy using GameBloc! If you have any questions or need assistance, feel free to open an issue in the repository. Happy gaming!

