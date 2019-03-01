# rollup-plugin-update-manifest

Update your Chrome Extension `manifest.json` automatically.

## Installation

```sh
npm i rollup-plugin-update-manifest -D
```

## Usage

```js
import { rollup } from 'rollup'
import { updateManifest } from 'rollup-plugin-update-manifest'

rollup({
  entry: 'main.js',
  plugins: [
    updateManifest({
      src: 'src/manifest.js',
      dest: 'dest/manifest.js'
    })
  ]
})
```
