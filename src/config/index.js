let isDevelopment = process.env.NODE_ENV === 'development'

export let pageSize = 10

if (isDevelopment) {

} else {
  pageSize = 20
}

export default {
  pageSize
}
