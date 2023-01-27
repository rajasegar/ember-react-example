'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {});

  // return app.toTree();
  const { Webpack } = require('@embroider/webpack');
  return require('@embroider/compat').compatBuild(app, Webpack, {
    staticAddonTestSupportTrees: true,
    staticAddonTrees: true,
    staticHelpers: true,
    staticModifiers: true,
    staticComponents: true,
    splitAtRoutes: ['index', 'react'],
    packagerOptions: {
      webpackConfig: {
        module: {
          rules: [
            {
              test: /some-react-lib\/.*\.jsx/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: [['@babel/preset-react', { runtime: 'automatic' }]],
                },
              },
            },
          ],
        },
        plugins: [
          new BundleAnalyzerPlugin({
            generateStatsFile: true,
            openAnalyzer: false,
            statsFilename: path.join(
              process.cwd(),
              'concat-stats-for',
              'my-stats.json'
            ),
          }),
        ],
      },
    },
  });
};
