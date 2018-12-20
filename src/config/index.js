const config = {
  development: {
    host: 'https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui'
  },
  production: {
    host: 'https://easy-mock.com/mock/5c1b42e3fe5907404e6540e9/hiui'
  }
}

export default key => {
  if (config[process.env.NODE_ENV][key] !== undefined) {
    return config[process.env.NODE_ENV][key]
  }

  return config[key]
}
