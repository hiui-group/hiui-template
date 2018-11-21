const config = {
  development: {
  },
  test: {
  },
  production: {
  }
}

export default key => {
  if (config[__env__][key] !== undefined) {
    return config[__env__][key]
  }
  
  return config[key]
}
  
