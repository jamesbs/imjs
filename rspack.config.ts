import { paths } from './env.ts'
import { join } from 'path'
import HtmlRspackPluginModule from '@rspack/plugin-html'
import { DotenvPlugin } from 'rspack-plugin-dotenv'

// some weird issue with how rspack handles module imports/exports
const HtmlRspackPlugin = (HtmlRspackPluginModule as any).default

const config = {
  entry: {
    main: `./app/web/index.tsx`,
  },
  output: {
    filename: 'main.js',
    path: paths.dist,
  },
  plugins: [
    new DotenvPlugin(),
    new HtmlRspackPlugin({
      template: join(paths.web, 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          tsconfig: './tsconfig.json',
        },
      },
    ],
  },
}

export default config
