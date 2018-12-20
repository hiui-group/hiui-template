const config = {
  development: {
    // host: 'http://10.236.91.196:7002'
    host: 'https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui'
  },
  test: {
  },
  production: {
    host: 'http://10.236.90.214:7002'
  }
}

console.log(process.env.NODE_ENV)
export default key => {
  if (config[process.env.NODE_ENV][key] !== undefined) {
    return config[process.env.NODE_ENV][key]
  }

  return config[key]
}
