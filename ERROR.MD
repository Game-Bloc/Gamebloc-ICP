## Errors and solutions

```Error: Failed while trying to deploy canisters.
Caused by: Failed while trying to deploy canisters.
  Failed while trying to install all canisters.
    Failed to install wasm module to canister 'gamebloc_new_frontend'.
      Failed to store assets in canister 'gamebloc_new_frontend'.
        Failed asset sync with canister cv4ma-4qaaa-aaaal-adntq-cai.
          Failed to create project asset: Failed to create encoding: Failed to create chunk: Failed to create chunk: The replica returned an HTTP Error: Http Error: status 500 Internal Server Error, content type "text/plain; charset=utf-8", content: backend_timeout
            Failed to create encoding: Failed to create chunk: Failed to create chunk: The replica returned an HTTP Error: Http Error: status 500 Internal Server Error, content type "text/plain; charset=utf-8", content: backend_timeout
              Failed to create chunk: Failed to create chunk: The replica returned an HTTP Error: Http Error: status 500 Internal Server Error, content type "text/plain; charset=utf-8", content: backend_timeout```

solution - 

    Try editing the webpack.config.js file.
    ```new CopyPlugin({
      patterns: [
        {
          from: `src/${frontendDirectory}/src/.ic-assets.json*`,
          to: ".ic-assets.json5",
          noErrorOnMissing: true,
        },
      ],
    }) 
    ,
  ```
  You can comment the new CopyPlugin out or add `,() => undefined,`