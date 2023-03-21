module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  core: {
    builder: "webpack5",
  },
  // ...
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "graceful-fs": false,
      fs: "graceful-fs",
    };
    return config;
  },
};
