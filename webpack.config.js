require("dotenv").config()
const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

// const LOCAL_II_CANISTER = "http://a3shf-5eaaa-aaaaa-qaafa-cai.localhost:4943"
const LOCAL_II_CANISTER = "http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943"
// const LOCAL_II_CANISTER = "http://br5f7-7uaaa-aaaaa-qaaca-cai.localhost:4943"
// const LOCAL_II_CANISTER = "http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943"
// const LOCAL_II_CANISTER = "http://bw4dl-smaaa-aaaaa-qaacq-cai.localhost:4943"
// const LOCAL_II_CANISTER = "http://by6od-j4aaa-aaaaa-qaadq-cai.localhost:4943"

const network =
  process.env.DFX_NETWORK ||
  (process.env.NODE_ENV === "production" ? "ic" : "local")

function initCanisterEnv() {
  let localCanisters, prodCanisters
  try {
    localCanisters = require(path.resolve(".dfx", "local", "canister_ids.json"))
    console.log("local canister", localCanisters)
  } catch (error) {
    console.log("No local canister_ids.json found. Continuing production")
  }
  try {
    prodCanisters = require(path.resolve("canister_ids.json"))
    console.log("Production canister", prodCanisters)
  } catch (error) {
    console.log("No production canister_ids.json found. Continuing with local")
  }

  const network =
    process.env.DFX_NETWORK ||
    (process.env.NODE_ENV === "production" ? "ic" : "local")

  const canisterConfig = network === "local" ? localCanisters : prodCanisters

  return Object.entries(canisterConfig).reduce((prev, current) => {
    const [canisterName, canisterDetails] = current
    prev[canisterName.toUpperCase() + "_CANISTER_ID"] = canisterDetails[network]
    return prev
  }, {})
}
const canisterEnvVariables = initCanisterEnv()

const isDevelopment = process.env.NODE_ENV !== "production"

const frontendDirectory = "gamebloc_new_frontend"

const frontend_entry = path.join("src", frontendDirectory, "src", "index.html")

module.exports = {
  target: "web",
  mode: isDevelopment ? "development" : "production",
  entry: {
    // The frontend.entrypoint points to the HTML file for this build, so we need
    // to replace the extension to `.js`.
    index: path.join(__dirname, frontend_entry).replace(/\.html$/, ".jsx"),
  },
  devtool: isDevelopment ? "source-map" : false,
  optimization: {
    minimize: !isDevelopment,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"],
    fallback: {
      assert: require.resolve("assert/"),
      buffer: require.resolve("buffer/"),
      events: require.resolve("events/"),
      stream: require.resolve("stream-browserify/"),
      util: require.resolve("util/"),
      crypto: require.resolve("crypto-browserify"),
      vm: require.resolve("vm-browserify"),
    },
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "dist", frontendDirectory),
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx)$/,
        exclude: /nodeModules/,
        loader: "ts-loader",
      },

      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      { test: /\.css$/, use: ["style-loader", "css-loader", "postcss-loader"] },
    ],
  },

  // Depending in the language or framework you are using for
  // front-end development, add module loaders to the default
  // webpack configuration. For example, if you are using React
  // modules and CSS as described in the "Adding a stylesheet"
  // tutorial, uncomment the following lines:
  // module: {
  //  rules: [
  //    { test: /\.(ts|tsx|jsx)$/, loader: "ts-loader" },
  //    { test: /\.css$/, use: ['style-loader','css-loader'] }
  //  ]
  // },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, frontend_entry),
      cache: false,
    }),
    // new webpack.EnvironmentPlugin([
    //   ...Object.keys(process.env).filter((key) => {
    //     if (key.includes("CANISTER")) return true;
    //     if (key.includes("DFX")) return true;
    //     return false;
    //   }),
    // ]),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
      LOCAL_II_CANISTER,
      DFX_NETWORK: network,
      ...canisterEnvVariables,
    }),
    new webpack.ProvidePlugin({
      Buffer: [require.resolve("buffer/"), "Buffer"],
      process: require.resolve("process/browser"),
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: `src/${frontendDirectory}/src/.ic-assets.json*`,
    //       to: ".ic-assets.json5",
    //       noErrorOnMissing: true,
    //     },
    //   ],
    // }),
  ],
  // proxy /api to port 4943 during development.
  // if you edit dfx.json to define a project-specific local network, change the port to match.
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
    static: path.resolve(__dirname, "src", frontendDirectory, "assets"),
    hot: true,
    watchFiles: [path.resolve(__dirname, "src", frontendDirectory)],
    liveReload: true,
    historyApiFallback: {
      rewrites: [{ from: /./, to: "/index.html" }],
    },
  },
}
