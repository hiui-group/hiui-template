const moduleNameFormater = key => {
  return key.split('/')[1].replace(/^\w/, all => all.toLowerCase())
}
const files = require.context('./', true, /\w+\.js$/)
console.log(files, 'files')
const modules = {}
files.keys().forEach(key => {
  modules[moduleNameFormater(key)] = files(key).default
})
