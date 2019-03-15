import mkdirp from 'mkdirp-promise'
import path from 'path'
import jsonfile from 'jsonfile'
import {
  derivePermissions,
  deriveManifest,
} from '@bumble/manifest'

/* ============================================ */
/*                UPDATE MANIFEST               */
/* ============================================ */

export default function autoManifest({ pkg } = {}) {
  // console.count('manifest')

  if (!pkg) {
    throw Error(
      'auto-manifest: options must include package.json object',
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
          'auto-manifest: input is not manifest.json',
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
      const derivedPermsSet = Object.values(bundle)
        .filter(({ isAsset }) => !isAsset)
        .flatMap(({ modules }) => Object.keys(modules))
        .reduce((set, id) => {
          moduleCache[id].forEach(perm => set.add(perm))

          return set
        }, new Set())

      const srcManifest = await jsonfile.readFile(manifest.src)

      const derivedManifest = deriveManifest(pkg, srcManifest, [
        ...derivedPermsSet,
      ])

      // check for new permissions
      if (
        finalPermissions !== derivedManifest.permissions.join()
      ) {
        this.warn(
          `New permissions: ${derivedManifest.permissions}`,
        )
        finalPermissions = derivedManifest.permissions.join()
      }

      // should recursively create dirs in path
      await mkdirp(dir).catch(error => {
        this.error(error)
      })

      await jsonfile.writeFile(
        path.join(dir, 'manifest.json'),
        derivedManifest,
        {
          spaces: 2,
        },
      )
    },
  }
}
