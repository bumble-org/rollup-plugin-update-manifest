# rollup-plugin-update-manifest

Update your Chrome Extension manifest.json automatically.

```js
import tpl from './tpl.html'
console.log(`Template for render: ${tpl}`)
```

## Installation

```sh
npm i rollup-plugin-update-manifest -D
```

## Usage

```js
import { rollup } from 'rollup'
import { string } from 'rollup-plugin-update-manifest'

rollup({
  entry: 'main.js',
  plugins: [
    string({
      // Required to be specified
      include: '**/*.html',

      // Undefined by default
      exclude: ['**/index.html']
    })
  ]
})
```
