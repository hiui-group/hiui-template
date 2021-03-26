import { HiRequestOptions } from "./type"

const defaultJsonpOptions = {
  timeout: 5000,
  jsonpCallback: 'callback'
}

const generateCallbackFunction = () => {
  return `jsonp_${Date.now()}_${Math.ceil(Math.random() * 100000)}`
}

const clearFunction = (functionName: string) => {
  try {
    delete window[functionName]
  } catch (e) {
    window[functionName] = undefined
  }
}


const insertScript = (script: HTMLScriptElement) => {
  document.getElementsByTagName('head')[0].appendChild(script)
}

const removeScript = (scriptId: string) => {
  const script = document.getElementById(scriptId)

  if (script) {
    document.getElementsByTagName('head')[0].removeChild(script)
  }
}

const jsonp = (options: HiRequestOptions = defaultJsonpOptions) => {
  const { url: urlOption, timeout, jsonpCallback, jsonpCallbackFunction, charset } = options
  let timeoutId: number

  return new Promise((resolve, reject) => {
    const url = urlOption + (urlOption.indexOf('?') === -1 ? '?' : '&')
    const callbackFunction = jsonpCallbackFunction || generateCallbackFunction()

    // 注册 jsonp callback
    window[callbackFunction] = (response: any) => {
      resolve({
        ok: true,
        // keep consistent with fetch API
        json: () => Promise.resolve(response)
      })

      clearTimeout(timeoutId)

      clearFunction(callbackFunction)
      removeScript(scriptId)
    }

    // 创建 jsonp 发送脚本
    const jsonpScript = document.createElement('script')
    const scriptId = `${jsonpCallback}_${callbackFunction}`
    jsonpScript.id = scriptId
    jsonpScript.setAttribute('src', `${url}${jsonpCallback}=${callbackFunction}`)
    if (charset) {
      jsonpScript.setAttribute('charset', charset)
    }

    // 发送 jsonp
    insertScript(jsonpScript)

    // 超时取消
    timeoutId = setTimeout(() => {
      reject(new Error(`JSONP request to ${urlOption} timed out`))

      clearFunction(callbackFunction)
      removeScript(scriptId)

      // 超时后响应处理：清理自己
      window[callbackFunction] = () => clearFunction(callbackFunction)

    }, timeout)

    // Caught if got 404/500
    jsonpScript.onerror = () => {
      reject(new Error(`JSONP request to ${urlOption} failed`))

      clearTimeout(timeoutId)

      clearFunction(callbackFunction)
      removeScript(scriptId)
    }
  })
}

export type jsonpType = typeof jsonp
export default jsonp
