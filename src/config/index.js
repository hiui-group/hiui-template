const config = {
  development: {
    // host: 'http://10.236.90.214:7002'
    host: 'http://127.0.0.1:7002'
  },
  test: {
  },
  production: {
    host: 'http://10.236.90.214:7002'
  }
}

export default key => {
  if (config[__env__][key] !== undefined) {
    return config[__env__][key]
  }
  
  return config[key]
}
  
