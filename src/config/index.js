const config = {
  development: {
    host: 'http://10.236.91.196:7002'
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
