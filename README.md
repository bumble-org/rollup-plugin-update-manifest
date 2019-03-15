# rollup-plugin-auto-manifest

Update your Chrome Extension `manifest.json` automatically.
This plugin requires `rollup-plugin-manifest-entry` as a peer dependency.

## Installation

```sh
npm i rollup-plugin-auto-manifest rollup-plugin-manifest-entry -D
```

## Usage

```js
import autoManifest from 'rollup-plugin-auto-manifest'
import manifestEntry from 'rollup-plugin-manifest-entry'
import pkg from './package.json'

export default {
  input: './src/manifest.json',
  output: {
    dir: './build'
  }
  plugins: [
    autoManifest({
      pkg
    }),
    manifestEntry({
      copyManifest: false,
    })
  ]
}
```
