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
    path: 'group-horizontal',
    component: require('../view/template/group-horizontal')
  },
  {
    path: 'group-vertical',
    component: require('../view/template/group-vertical')
  },
  {
    path: 'tree-single',
    component: require('../view/template/tree-single')
  },
  {
    path: 'tree-multiple',
    component: require('../view/template/tree-multiple')
  }
]