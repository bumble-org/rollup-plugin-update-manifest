export const hooksInOrder = () => {
  return {
    name: 'hooksInOrder',
    options(...args) {
      console.log('1 options -sync, secuential', args)
    },
    buildStart(...args) {
      console.log('2 buildStart -async, parallel', args)
    },
    resolveId(...args) {
      console.log('3 resolveId -async, first', args)
    },
    load(...args) {
      console.log('4 load -async, first', args)
    },
    transform(...args) {
      console.log('5 transform -async, sequential', args)
    },
    buildEnd(...args) {
      console.log('6 buildEnd -async, parallel', args)
    },
    renderStart(...args) {
      console.log('7 renderStart -async, parallel', args)
    },
    // comment string to add at the top of file
    banner(...args) {
      console.log('8 banner -async, parallel', args)
    },
    // comment string to add at the bottom of file
    footer(...args) {
      console.log('9 footer -async, parallel', args)
    },
    // The code goes at the beginning inside any format-specific wrapper.
    intro(...args) {
      console.log('10 intro -async, parallel', args)
    },
    // The code goes at the bottom inside any format-specific wrapper.
    outro(...args) {
      console.log('11 outro -async, parallel', args)
    },
    outputOptions(...args) {
      console.log('outputOptions -sync, sequential', args)
    },

    renderError(...args) {
      console.log('12 renderError -async, parallel', args)
    },
    generateBundle(...args) {
      console.log('generateBundle -async, secuential', args)
    },
    renderChunk(...args) {
      console.log('renderChunk -async, secuential', args)
    },
    resolveDynamicImport(...args) {
      console.log('resolveDynamicImport -async, first', args)
    },
    watchChange(...args) {
      console.log('watchChange -sync, sequential', args)
    },
    writeBundle(...args) {
      console.log('writeBundle -async, parallel', args)
    },
  }
}
