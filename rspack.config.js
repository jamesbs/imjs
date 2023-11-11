// @ts-check
import path from 'path'
import url from 'url'
import HtmlRspackPluginModule from '@rspack/plugin-html'

const HtmlRspackPlugin = HtmlRspackPluginModule.default // some weird bun + rspack runner quirk

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
/** @type {import('@rspack/cli').Configuration} */
const config = {
  entry: {
    main: `./web/index.tsx`,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlRspackPlugin({
      template: path.join(__dirname, 'web', 'index.html'),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        options: {
          tsconfig: './tsconfig.web.json',
        },
      },
    ],
  },
}

export default config
