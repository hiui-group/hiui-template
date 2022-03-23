import axios from 'axios'
import path from 'path-browserify'
import { saveAs } from 'file-saver'
import Zip from 'jszip'

const SPLIT_REGEXP = /\n|\n\s/
const IMPORT_REGEXP = /^\s*import\s/
const IMPORT_FROM_PATH_REGEXP = /import\s.+\sfrom\s["'](.*)["']/
const IMPORT_PATH_REGEXP = /import\s["'](.*)["']/
const EXT_REGEXP = /\w+\.\w+$/

const extensions = ['.tsx', '.ts']
const indexes = extensions.map((ext) => 'index' + ext)

const branch = 'master-pro'

const SUBPATH_GITHUB_URL = (subpath: string) => {
  const url =
    path.join(
      'https://api.github.com/repos/hiui-group/hiui-template/contents/src/views/',
      subpath
    ) + `?ref=${branch}`

  return url
}

const PATH_GITHUB_URL = (pathname: string) => {
  const url = path.join(
    `https://raw.githubusercontent.com/hiui-group/hiui-template/${branch}/`,
    pathname
  )
  return url
}

const getExt = (pathname: string) => {
  const index = pathname.lastIndexOf('.')
  if (index !== -1) {
    return pathname.slice(index + 1)
  }
  return 'unknown'
}

export interface FileCodeInfo {
  path: string
  raw: string
  ext: string
}
const codeCacheMap = new Map<string, FileCodeInfo | null>()
const pathsCacheMap = new Map<string, string[]>()

export const getCodesWithImportModules = (pathname: string) => {
  const relativePath = path.join('./src/views/', pathname)

  return getCodeWithImportModules(relativePath, [])
}

const getCodeWithImportModules = async (pathname: string, codes: FileCodeInfo[]) => {
  let code: FileCodeInfo | undefined | null = codeCacheMap.get(pathname)
  if (code === undefined) {
    code = await fetchCodeFromGithub(pathname)
    codeCacheMap.set(pathname, code)
    console.log('解析 path 对应代码 ---------------', pathname, code)
  }

  if (!code) return
  codes.push(code)

  let pathsNeededImport = pathsCacheMap.get(code.path)

  if (pathsNeededImport === undefined) {
    pathsNeededImport = parseImportPathsFromCodeString(code.raw)

    let basePath = code.path
    // fix 处理文件 join，移除到上一级目录
    if (EXT_REGEXP.test(basePath)) {
      basePath = basePath.replace(EXT_REGEXP, '')
    }

    pathsNeededImport = pathsNeededImport.map((modulePath) => path.join('./', basePath, modulePath))

    pathsCacheMap.set(code.path, pathsNeededImport)
  }

  if (Array.isArray(pathsNeededImport)) {
    await Promise.all(
      pathsNeededImport.map((modulePath) => {
        return getCodeWithImportModules(modulePath, codes)
      })
    )
  }

  return codes
}

// Access Limit
const downloadCodeFromGithubAPI = async (subpath: string) => {
  const url = SUBPATH_GITHUB_URL(subpath)
  console.log('downloadCodeFromGithubAPI URL: ', url)

  try {
    const ret = await axios.get(url)
    const data = ret.data
    let foundFileObj = data
    // const data = Array.isArray(ret.data) ? ret.data : [ret.data]

    if (Array.isArray(data)) {
      // api： https://api.github.com/repos/hiui-group/hiui-template/contents/src/views/dashboard-data-analysis?ref=master-pro
      foundFileObj = data.find((item: any) => {
        return indexes.includes(item.name)
      })

      if (!foundFileObj) {
        console.error('fetchCodeFromGithub 未匹配到对应代码文件', data)
      }
    }

    const codeRet = await axios.get(foundFileObj.download_url)
    return codeRet.data
  } catch (err) {
    console.log('fetchCodeFromGithub 拉取代码失败!!!', err)

    console.error(err)
  }
}

const downloadCodeFromGithub = async (pathname: string) => {
  const url = PATH_GITHUB_URL(pathname)
  // console.log('downloadCodeFromGithub URL: ', pathname)

  const ret = await axios.get(url)
  return ret.data
}

const fetchCodeFromGithub = async (subpath: string) => {
  let filenames = []

  if (EXT_REGEXP.test(subpath)) {
    filenames.push('')
  }

  filenames = extensions.reduce((acc, ext) => {
    acc.push('/index' + ext)
    acc.push(ext)
    return acc
  }, filenames)
  console.log('filenames', filenames, subpath)

  for (const filename of filenames) {
    try {
      const path = subpath + filename
      const result = await downloadCodeFromGithub(path)
      if (result) {
        return { path, raw: result, ext: getExt(filename) }
        // return result
      }
    } catch (err) {}
  }
  console.log('fetchCodeFromGithub: 未匹配到任何文件')
  return null
  // const url = SUBPATH_GITHUB_URL(subpath)
  // const results = await Promise.all([
  //   // downloadCodeFromGithubAPI(subpath),
  //   ...extensions.map((ext) => downloadCodeFromGithub(subpath + '/index' + ext)),
  //   ...extensions.map((ext) => downloadCodeFromGithub(subpath + ext)),
  // ])

  // console.log('results', results)

  // // results.find((item) => {
  // //   item
  // // })
  // return downloadCodeFromGithubAPI(subpath)
}

const parseImportPathsFromCodeString = (code: string) => {
  if (typeof code !== 'string') return []

  const rowCodeImport = code.split(SPLIT_REGEXP).filter((row) => {
    return IMPORT_REGEXP.test(row)
  })

  const pathsNeedImport = rowCodeImport.reduce((acc, cur) => {
    try {
      const matchedPath = parseSingleImportPath(cur)
      if (matchedPath) {
        acc.push(matchedPath)
      }
    } catch (error) {
      console.error(error)
    }

    return acc
  }, [] as string[])

  return pathsNeedImport
}

const parseSingleImportPath = (pathname: string) => {
  if (typeof pathname !== 'string') return

  let matchedResult
  let matchedPath

  if (pathname.includes(' from ')) {
    // import ... from ...
    matchedResult = IMPORT_FROM_PATH_REGEXP.exec(pathname)
  } else {
    // import ...
    matchedResult = IMPORT_PATH_REGEXP.exec(pathname)
  }

  // 解析得到 path
  if (matchedResult && matchedResult[1]) {
    matchedPath = matchedResult[1]
  }

  // 排除三方库引用 path
  if (matchedPath && matchedPath.includes('.')) {
    return matchedPath
  }
}

export const paths2TreeData = (arr: FileCodeInfo[]) => {
  if (!Array.isArray(arr)) return []

  const root = { id: -1, children: [] }
  const length = arr.length
  let maxDepth = 0

  const arrTable = arr.map((fileInfo) => {
    const path = fileInfo.path
    const row = path.split('/')
    maxDepth = Math.max(row.length, maxDepth)
    return row
  })

  let parentNodes = new Array(length).fill(root)
  let nextParentNodes

  for (let i = 0; i < maxDepth; i++) {
    nextParentNodes = []
    for (let j = 0; j < length; j++) {
      const subPath = arrTable[j][i]
      const parent = parentNodes[j]

      if (!subPath) {
        continue
      }

      if (!Array.isArray(parent.children)) {
        parent.children = []
      }

      let foundIndex = parent.children.findIndex((subNode: any) => {
        return subNode.title === subPath
      })

      if (foundIndex === -1) {
        foundIndex = parent.children.length
        parent.children.push({ id: `${i}-${j}`, title: subPath })
      }

      const foundNode = parent.children[foundIndex]
      if (!arrTable[j][i + 1]) {
        foundNode.isLeaf = true
        // 文件信息存储
        Object.assign(foundNode, arr[j])
        foundNode.id = arr[j].path
      }

      nextParentNodes[j] = foundNode
    }

    parentNodes = nextParentNodes
  }

  return root.children
}
// 下载文件
export const downloadFiles = (codes: FileCodeInfo[]) => {
  const zip = new Zip()
  const src = zip.folder('src')

  codes.forEach((codeInfo) => {
    src?.file(codeInfo.path, codeInfo.raw)
  })

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, 'hiui-template-pro-example.zip')
  })
}
