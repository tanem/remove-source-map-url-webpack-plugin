import path from 'path'
import webpack from 'webpack'
import merge from 'webpack-merge'
import RemoveSourceMapUrlWebpackPlugin from '../src'
import { readdir, readFile } from '../src/fs'
import baseConfig from './fixtures/webpack.config'

const defaultOutputPath = baseConfig.output!.path!

it('removes source map urls from .js and .css files by default', done => {
  expect.assertions(2)
  webpack(
    merge(baseConfig, {
      plugins: [new RemoveSourceMapUrlWebpackPlugin()]
    }),
    async () => {
      let fileNames = await readdir(defaultOutputPath)
      fileNames = fileNames.filter(fileName => /\.(js|css)$/.test(fileName))
      for (const fileName of fileNames) {
        const data = await readFile(
          path.resolve(defaultOutputPath, fileName),
          'utf8'
        )
        expect(data).not.toMatch(/# sourceMappingURL=(.*\.map)/)
      }
      done()
    }
  )
})

it('removes source map urls from files found by a custom file name regex', done => {
  expect.assertions(1)
  const fileNameRegex = /\.js$/
  webpack(
    merge(baseConfig, {
      plugins: [new RemoveSourceMapUrlWebpackPlugin({ fileNameRegex })]
    }),
    async () => {
      let fileNames = await readdir(defaultOutputPath)
      fileNames = fileNames.filter(fileName => fileNameRegex.test(fileName))
      for (const fileName of fileNames) {
        const data = await readFile(
          path.resolve(defaultOutputPath, fileName),
          'utf8'
        )
        expect(data).not.toMatch(/# sourceMappingURL=(.*\.map)/)
      }
      done()
    }
  )
})
