const { existsSync } = require('fs')
const path = require('path')
const jsonfile = require('jsonfile')
const {
  derivePermissions,
  deriveManifest
} = require('@bumble/manifest')

/* ============================================ */
/*                UPDATE MANIFEST               */
/* ============================================ */

function manifest({ src, dest, pkg } = {}) {
  console.count('manifest')

  if (!src) {
    // TODO: write better error message
    throw Error('options must include src manifest.json path')
  }

  if (!dest) {
    // TODO: write better error message
    throw Error('options must include dest manifest.json path')
  }

  if (!pkg) {
    // TODO: write better error message
    throw Error('options must include package.json object')
  }

  const moduleCache = {}
  const bundleCache = {}
  let finalPermissions = ''

  return {
    name: 'manifest',

    transform(code, id) {
      console.count('transform')

      const permissions = derivePermissions(code)

      moduleCache[id] = permissions

      // Make sure this runs when the manifest changes
      this.addWatchFile(src)
    },

    generateBundle({ file }, bundle) {
      console.count('generateBundle')

      // permissions cache
      const name = path.basename(file)

      const bundlePermsSet = Object.keys(
        bundle[name].modules
      ).reduce((set, id) => {
        moduleCache[id].forEach(perm => set.add(perm))

        return set
      }, new Set())

      bundleCache[name] = [...bundlePermsSet]

      // manifest
      if (!existsSync(src)) {
        throw Error('source manifest should exist')
      }

      const srcManifest = jsonfile.readFileSync(src)

      const manifest = deriveManifest(
        pkg,
        srcManifest,
        Object.values(bundleCache)
      )

      // check for new permissions
      if (finalPermissions !== manifest.permissions.join()) {
        console.log('New permissions:', manifest.permissions)
        finalPermissions = manifest.permissions.join()
      }

      return jsonfile.writeFile(dest, manifest, { spaces: 2 })
    }
  }
}

module.exports = manifest
