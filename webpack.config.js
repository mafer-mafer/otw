module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: __dirname,
    filename: "./public/bundle.js",
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"],
        },
      },
    ],
  },
  target: "node",
  // resolve: {
  //   fallback: {
  //     fs: false,
  //     tls: false,
  //     net: false,
  //     path: false,
  //     zlib: false,
  //     http: false,
  //     https: false,
  //     stream: false,
  //   },
  // },
};
