const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const dotenv = require("dotenv");

module.exports = () => {
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.tsx",
    output: {
      path: path.join(__dirname, "build"),
      filename: "index.bundle.js",
      publicPath: "/",
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    corejs: {
                      version: 3,
                    },
                    useBuiltIns: "usage",
                    targets: {
                      edge: "17",
                      firefox: "60",
                      chrome: "67",
                      safari: "11.1",
                      ie: "11",
                    },
                  },
                ],
                "@babel/react",
                "@babel/preset-typescript",
              ],
            },
          },
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
    ],
  };
};
