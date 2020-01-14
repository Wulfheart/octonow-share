const path = require('path');

module.exports = ({ config, mode }) => {

  config.module.rules.push({
    test: /\.css$/,
    loaders: [
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: './postcss.config.js',
          },
        },
      },
    ],

    include: path.resolve(__dirname, '../storybook/'),
  });

  return config;
};