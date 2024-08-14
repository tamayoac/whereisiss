import * as webpack from 'webpack';
import DotenvWebpack from 'dotenv-webpack'

const config: webpack.Configuration = {
  plugins: [
    new DotenvWebpack({
      path: './.env',
    })
  ]
};

export default config;