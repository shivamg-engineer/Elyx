const path = require("path");
module.exports = {
    mode: "production",  // enables minification & tree shaking
    entry: "./src/index.ts",
    devtool: "source-map",  // <-- Add this line to enable source maps
    module: {
        rules: [
            {
                test: /.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};