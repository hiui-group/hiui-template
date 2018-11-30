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
  },
  {
    path: 'query-2',
    component: require('../view/template/query-2')
  },
  {
    path: 'group-horizontal',
    component: require('../view/template/group-horizontal')
  },
  {
    path: 'group-vertical',
    component: require('../view/template/group-vertical')
  }
]