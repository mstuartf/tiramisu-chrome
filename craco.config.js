const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // console.log(webpackConfig);
      return {
        ...webpackConfig,
        plugins: [
          ...webpackConfig.plugins.map((plugin) => {
            if (plugin.constructor.name !== "MiniCssExtractPlugin") {
              return plugin;
            }
            return new MiniCssExtractPlugin({
              ...plugin.options,
              filename: "static/css/[name].css",
            });
          }),
        ],
        entry: {
          main: [
            env === "development" &&
              require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs,
          ].filter(Boolean),
          background: "./src/chrome/background.ts",
          msgListener: "./src/chrome/msgListener.ts",
        },
        output: {
          ...webpackConfig.output,
          filename: "static/js/[name].js",
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
          minimize: false, // not allowed to minify when submitting
        },
      };
    },
  },
};
