import path from 'path'
import webpack from 'webpack'
import { readdir, readFile, writeFile } from './fs'

class RemoveSourceMapUrlWebpackPlugin implements webpack.Plugin {
  fileNameRegex: RegExp

  constructor({
    fileNameRegex = /\.(js|css)$/
  }: { fileNameRegex?: RegExp } = {}) {
    this.fileNameRegex = fileNameRegex
  }

  apply(compiler: webpack.Compiler) {
    compiler.hooks.done.tapPromise(
      'RemoveSourceMapUrlWebpackPlugin',
      async stats => {
        const outputPath = stats.compilation.outputOptions.path
        let fileNames = await readdir(outputPath)
        fileNames = fileNames.filter(fileName =>
          this.fileNameRegex.test(fileName)
        )
        for (const fileName of fileNames) {
          const filePath = path.resolve(outputPath, fileName)
          const data = await readFile(filePath, 'utf8')
          const lines = data.split('\n')
          const result = lines
            .filter(line => !/^.*# sourceMappingURL=(.*\.map).*/.test(line))
            .join('\n')
          await writeFile(filePath, result, 'utf8')
        }
      }
    )
  }
}

export default RemoveSourceMapUrlWebpackPlugin
