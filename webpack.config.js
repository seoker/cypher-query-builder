const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = env => {
  let production = env && env.production;
  return {
    context: path.resolve(__dirname, 'src'),
    devtool: 'source',
    entry: './index.ts',
    target: 'node',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      libraryTarget: 'umd',
    },
    module: {
      rules: [{
        test: /\.tsx?$/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            silent: true,
            sourceMap: true,
          },
        },
        exclude: [ /node_modules/ ],
      }],
    },
    resolve: {
      modules: [
        'node_modules',
      ],
      extensions: ['.ts', '.js', '.json', '*'],
    },
    plugins: []
      .concat(production ? [
        new UglifyJSPlugin({
          sourceMap: true,
        }),
      ]: []),
  }
};
