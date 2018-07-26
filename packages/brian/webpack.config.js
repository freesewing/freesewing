const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "module.js",
    libraryTarget: "var",
    library: "brian"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
          plugins: [require("@babel/plugin-proposal-object-rest-spread")]
        }
      }
    ]
  },
  devtool: "source-map",
  target: "web",
  externals: ["freesewing"],
  serve: {
    port: 8080,
    content: "./index.html"
  }
};
