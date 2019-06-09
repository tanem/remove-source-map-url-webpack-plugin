# remove-source-map-url-webpack-plugin

[![npm version](https://img.shields.io/npm/v/@tanem/remove-source-map-url-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@tanem/remove-source-map-url-webpack-plugin)
[![build status](https://img.shields.io/travis/tanem/remove-source-map-url-webpack-plugin/master.svg?style=flat-square)](https://travis-ci.org/tanem/remove-source-map-url-webpack-plugin)
[![coverage status](https://img.shields.io/codecov/c/github/tanem/remove-source-map-url-webpack-plugin.svg?style=flat-square)](https://codecov.io/gh/tanem/remove-source-map-url-webpack-plugin)
[![npm downloads](https://img.shields.io/npm/dm/@tanem/remove-source-map-url-webpack-plugin.svg?style=flat-square)](https://www.npmjs.com/package/@tanem/remove-source-map-url-webpack-plugin)

> A webpack plugin that removes source map URLs.

## The problem

We want to send built files plus their external source maps to third-party monitoring services, but don't want to expose source maps to our clients. We also want to remove source map URLs in a way that plays nicely with other plugins and doesn't require a seperate build.

## This solution

This webpack plugin removes source map URLs from files in the output path when the build is [`done`](https://webpack.js.org/api/compiler-hooks#done).

## Basic Usage

```js
const RemoveSourceMapUrlWebpackPlugin = require('@tanem/remove-source-map-url-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  },
  plugins: [new RemoveSourceMapUrlWebpackPlugin()]
}
```

## API

**Arguments**

- `options` - _Optional_ An object containing the optional arguments defined below. Defaults to `{}`.
  - `fileNameRegex` - _Optional_ The regex used to filter files found within the output path. Defaults to `/\.(js|css)$/`.

**Example**

```js
const RemoveSourceMapUrlWebpackPlugin = require('@tanem/remove-source-map-url-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js'
  },
  plugins: [new RemoveSourceMapUrlWebpackPlugin({ fileNameRegex: /\.js$/ })]
}
```

## Installation

> ⚠️This library requires Node.js 8.x or greater.

```
$ npm install @tanem/remove-source-map-url-webpack-plugin --save-dev
```

## License

MIT
