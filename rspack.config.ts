import { paths } from './env.ts'
import { join } from 'path'
import HtmlRspackPluginModule from '@rspack/plugin-html'
import { DotenvPlugin } from 'rspack-plugin-dotenv'

// some weird issue with how rspack handles module imports/exports
// also seems to work differently in docker than dev environment
const HtmlRspackPlugin =
  (HtmlRspackPluginModule as any).default || HtmlRspackPluginModule

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

export default (_: unknown, flags: any) => {
  return {
    ...config,
    mode: flags.mode ?? 'development',
  }
}
