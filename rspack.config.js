import path from 'path'
import url from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const config = {
  entry: {
    main: `./web/index.js`,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin()],
}

export default config
