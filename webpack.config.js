const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const webpack = require('webpack');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  config.ignoreWarnings = [/Failed to parse source map/];
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.resolve.fallback = {
    assert: false,
    crypto: false,
    os: false,
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      buffer: ['buffer', 'Buffer'],
      process: 'process/browser',
    })
  );
  return config;
});
