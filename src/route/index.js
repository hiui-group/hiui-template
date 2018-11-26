export default [
  {
    path: '/', 
    component: require('../view/layout/index'),
    indexRoute: {
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('../view/template/basic'))
        }, 'index')
      }
    }
  }
]