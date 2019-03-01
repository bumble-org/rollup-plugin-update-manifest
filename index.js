const { existsSync } = require('fs')
const jsonfile = require('jsonfile')
const startCase = require('lodash.startcase')

const cookies = s => /chrome\.cookies/.test(s)

const contextMenus = s => /chrome\.contextMenus/.test(s)

const notifications = s => /chrome\.notifications/.test(s)

const proxy = s => /chrome\.proxy/.test(s)

const storage = s => /chrome\.storage/.test(s)

const tabs = s => /chrome\.tabs/.test(s)

const webRequest = s => /chrome\.webRequest/.test(s)

const webRequestBlocking = s =>
  webRequest(s) && /'blocking'/.test(s)

const permissions = {
  cookies,
  contextMenus,
  notifications,
  proxy,
  storage,
  tabs,
  webRequest,
  webRequestBlocking
}

const checkPermissions = code =>
  Object.entries(permissions)
    .filter(([, fn]) => fn(code))
    .map(([key]) => key)

const derivePermissions = (code, oldPerms = []) => {
  const set = new Set(oldPerms)

  const permissions = checkPermissions(code)

  permissions.forEach(p => set.add(p))

  return [...set]
}

const {
  name,
  version,
  description,
  author
} = jsonfile.readFileSync('./package.json')

console.log('package.json exists', existsSync('./package.json'))

const deriveManifest = srcManifest => {
  return {
    manifest_version: 2,
    name: startCase(name),
    version,
    description,
    author,
    ...srcManifest
  }
}

/* ============================================ */
/*                UPDATE MANIFEST               */
/* ============================================ */

function updateManifest({ src, dest } = {}) {
  if (!src || !dest) {
    throw Error('manifest path should be specified')
  }

  return {
    name: 'updateManifest',

    writeBundle(bundle) {
      if (!existsSync(src)) {
        throw Error('source manifest must exist')
      }

      const { code } = Object.values(bundle).find(
        ({ code }) => code
      )

      const srcManifest = jsonfile.readFileSync(src)

      const manifest = deriveManifest(srcManifest)

      const permissions = derivePermissions(
        code,
        srcManifest.permissions
      )

      console.log('Derived permissions:', permissions)

      return jsonfile.writeFile(
        dest,
        {
          ...manifest,
          permissions
        },
        { spaces: 2 }
      )
    }
  }
}

export default updateManifest
