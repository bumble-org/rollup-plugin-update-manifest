const { existsSync } = require('fs')
const jsonfile = require('jsonfile')
const {
  derivePermissions,
  deriveManifest
} = require()

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

  const cache = {}
  let finalPermissions = ''

  return {
    name: 'manifest',

    transform(code, id) {
      console.count('transform')
      // Does the source manifest really need to exist?
      if (!existsSync(src)) {
        throw Error('source manifest must exist')
      }

      const permissions = derivePermissions(code)

      Object.assign(cache, { [id]: permissions })
      console.log('cache', cache)
    },

    generateBundle() {
      console.count('generateBundle')
      const srcManifest = jsonfile.readFileSync(src)

      const manifest = deriveManifest(
        pkg,
        srcManifest,
        Object.values(cache).flat()
      )

      if (finalPermissions !== manifest.permissions.join()) {
        console.log('New permissions:', manifest.permissions)
        finalPermissions = manifest.permissions.join()
      }

      return jsonfile.writeFile(dest, manifest, { spaces: 2 })
    }
  }
}

export default manifest
