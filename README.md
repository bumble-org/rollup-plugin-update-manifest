# rollup-plugin-auto-manifest

Update your Chrome Extension `manifest.json` automatically.

## Installation

```sh
npm i rollup-plugin-auto-manifest -D
```

## Usage

```js
import { rollup } from 'rollup'
import pkg from './package.json'
import manifest from 'rollup-plugin-auto-manifest'

rollup({
  entry: 'main.js',
  plugins: [
    manifest({
      // Any missing required fields will be derived from `package.json`
      src: 'src/manifest.js',
      dest: 'dest/manifest.js',
      pkg
    })
  ]
})
```
