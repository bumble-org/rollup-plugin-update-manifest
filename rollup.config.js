/* eslint-env node */

import updateManifest from './index'

export default [
  {
    input: 'fixtures/src/index.js',
    output: [
      {
        file: 'fixtures/dest/background.js',
        format: 'esm'
      }
    ],
    plugins: [
      updateManifest({
        src: 'fixtures/src/manifest.json',
        dest: 'fixtures/dest/manifest.json'
      })
    ]
  }
]
