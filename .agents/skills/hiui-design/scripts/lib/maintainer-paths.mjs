import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

function expandHome(targetPath) {
  if (!targetPath) {
    return targetPath
  }

  if (targetPath === '~') {
    return os.homedir()
  }

  if (targetPath.startsWith('~/')) {
    return path.join(os.homedir(), targetPath.slice(2))
  }

  return targetPath
}

export function resolveMaintainerHome({ env = process.env } = {}) {
  const explicit = String(env.HIUI_DESIGN_MAINTAINER_HOME || '').trim()
  if (explicit) {
    return path.resolve(expandHome(explicit))
  }

  return path.join(os.homedir(), '.codex', 'maintainers', 'hiui-design')
}

export function resolveMaintainerPaths({ skillRoot, env = process.env } = {}) {
  const maintainerHome = resolveMaintainerHome({ env })

  return {
    skillRoot,
    maintainerHome,
    runtimeDir: path.join(maintainerHome, 'runtime'),
  }
}

export async function ensureMaintainerRuntimeDir(paths) {
  await fs.mkdir(paths.runtimeDir, { recursive: true })
}
