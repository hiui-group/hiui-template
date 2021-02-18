const STORAGE_KEY = 'xiaomi_hiui_template_'
export const localStorage = {
  setItem (name, data) {
    window.localStorage.setItem(`${STORAGE_KEY}${name}`, data ? JSON.stringify(data) : data)
  },
  getItem (name) {
    const data = window.localStorage.getItem(`${STORAGE_KEY}${name}`)
    console.log('data', data)
    try {
      return data ? JSON.parse(data) : data
    } catch (err) {
      return data
    }
  }
}
