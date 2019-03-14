// this.meta is the only context prop accesible from this hook
const options = [
  {
    acorn: undefined,
    acornInjectPlugins: undefined,
    cache: undefined,
    chunkGroupingSize: 5000,
    context: undefined,
    experimentalCacheExpiry: 10,
    experimentalOptimizeChunks: undefined,
    experimentalTopLevelAwait: undefined,
    external: [],
    inlineDynamicImports: false,
    input: 'tests/fixtures/basic/background.js',
    manualChunks: undefined,
    moduleContext: undefined,
    onwarn: [Function],
    perf: false,
    plugins: [[Object]],
    preserveModules: undefined,
    preserveSymlinks: undefined,
    shimMissingExports: undefined,
    treeshake: undefined,
    watch: undefined,
  },
]
const buildStart = [
  {
    acorn: undefined,
    acornInjectPlugins: undefined,
    chunkGroupingSize: 5000,
    context: undefined,
    experimentalCacheExpiry: 10,
    experimentalOptimizeChunks: undefined,
    experimentalTopLevelAwait: undefined,
    external: [],
    inlineDynamicImports: false,
    input: 'tests/fixtures/basic/background.js',
    manualChunks: undefined,
    moduleContext: undefined,
    onwarn: [Function],
    perf: false,
    plugins: [[Object]],
    preserveModules: undefined,
    preserveSymlinks: undefined,
    shimMissingExports: undefined,
    treeshake: undefined,
    watch: undefined,
  },
]
const resolveId = [
  'tests/fixtures/basic/background.js',
  undefined,
]
const load = [
  '/home/jack/Documents/Bumble/rollup-plugin-input-json/tests/fixtures/basic/background.js',
]
const transform = [
  "import { b } from './content'\n\nexport const a = () => 'change' + b\n",
  '/home/jack/Documents/Bumble/rollup-plugin-input-json/tests/fixtures/basic/background.js',
]
const resolveId = [
  './content',
  '/home/jack/Documents/Bumble/rollup-plugin-input-json/tests/fixtures/basic/background.js',
]
const load = [
  '/home/jack/Documents/Bumble/rollup-plugin-input-json/tests/fixtures/basic/content.js',
]
const transform = [
  "export const b = 'B'\n",
  '/home/jack/Documents/Bumble/rollup-plugin-input-json/tests/fixtures/basic/content.js',
]
const buildEnd = []
const renderStart = []
const banner = []
const footer = []
const intro = []
const outro = []
const renderError = [
  {
    Error: ` You must supply "output.name" for IIFE bundles.
      at error (/home/jack/Documents/Bumble/rollup-plugin-input-json/node_modules/rollup/dist/rollup.js:3601:30)
      at iife (/home/jack/Documents/Bumble/rollup-plugin-input-json/node_modules/rollup/dist/rollup.js:3696:9)
      at Chunk.render (/home/jack/Documents/Bumble/rollup-plugin-input-json/node_modules/rollup/dist/rollup.js:15870:27)
      at /home/jack/Documents/Bumble/rollup-plugin-input-json/node_modules/rollup/dist/rollup.js:18520:38
      at Array.map (<anonymous>)
      at /home/jack/Documents/Bumble/rollup-plugin-input-json/node_modules/rollup/dist/rollup.js:18518:47
      at process.runNextTicks [as _tickCallback] (internal/process/next_tick.js:47:5)
      at Function.Module.runMain (internal/modules/cjs/loader.js:800:11)
      at findNodeScript.then.existing (/home/jack/.nvm/versions/node/v11.9.0/lib/node_modules/npm/node_modules/libnpx/index.js:268:14) code: 'INVALID_OPTION' `,
  },
]
