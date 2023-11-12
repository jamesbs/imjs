import { paths } from './env.ts'
import { join } from 'path'
import HtmlRspackPluginModule from '@rspack/plugin-html'

const HtmlRspackPlugin = (HtmlRspackPluginModule as any).default // some weird issue with how rspack handles module imports/exports

const config = {
  entry: {
    main: `./app/web/index.tsx`,
  },
  output: {
    filename: 'main.js',
    path: paths.dist,
  },
  plugins: [
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
