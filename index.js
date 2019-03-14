const { existsSync } = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const jsonfile = require('jsonfile')
const {
  derivePermissions,
  deriveManifest
} = require('@bumble/manifest')

/* ============================================ */
/*                UPDATE MANIFEST               */
/* ============================================ */

function manifest({ pkg } = {}) {
  // console.count('manifest')

  if (!pkg) {
    throw Error(
      'auto-manifest: options must include package.json object'
    )
  }

  const moduleCache = {}
  let finalPermissions = ''
  const manifest = {}

  return {
    name: 'auto-manifest',

    options({ input }) {
      // Check that input is manifest
      if (path.basename(input) !== 'manifest.json')
        throw new Error(
          'auto-manifest: input is not manifest.json'
        )

      manifest.src = input
    },

    transform(code, id) {
      // console.count('transform')
      const permissions = derivePermissions(code)

      moduleCache[id] = permissions

      // Make sure this runs when the manifest changes
      this.addWatchFile(manifest.src)
    },

    async generateBundle({ dir }, bundle) {
      // console.count('generateBundle')
      derivedManifest.dest = dir

      const derivedPermsSet = Object.values(bundle)
        .filter(({ isAsset }) => !isAsset)
        .flatMap(({ modules }) => Object.keys(modules))
        .reduce((set, id) => {
          moduleCache[id].forEach(perm => set.add(perm))

          return set
        }, new Set())

      const srcManifest = await jsonfile.FileSync(src)

      const derivedManifest = deriveManifest(pkg, srcManifest, [
        ...derivedPermsSet
      ])

      // check for new permissions
      if (
        finalPermissions !== derivedManifest.permissions.join()
      ) {
        console.log(
          'New permissions:',
          derivedManifest.permissions
        )
        finalPermissions = derivedManifest.permissions.join()
      }

      // should recursively create dirs in path
      mkdirp(dir, e => e && console.error(e))

      return jsonfile.writeFile(dir, derivedManifest, {
        spaces: 2
      })
    }
  }
}

module.exports = manifest
