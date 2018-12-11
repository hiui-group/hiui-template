export default [
  {
    path: '/', 
    exact: true,
    component: require('../template/basic').default,
    indexRoute: {
      getComponent(nextState, cb) {
        require.ensure([], require => {
          cb(null, require('../template/basic').default)
        }, 'index')
      }
    }
  },
  {
    path: '/basic',
    component: require('../template/basic').default
  },
  {
    path: '/group-horizontal',
    component: require('../template/group-horizontal').default
  },
  {
    path: '/group-vertical',
    component: require('../template/group-vertical').default
  },
  {
    path: '/tree-single',
    component: require('../template/tree-single').default
  },
  {
    path: '/tree-multiple',
    component: require('../template/tree-multiple').default
  },
  {
    path: '/tile-single',
    component: require('../template/tile-single').default
  },
  {
    path: '/tile-multiple',
    component: require('../template/tile-multiple').default
  },
  {
    path: '/query',
    component: require('../template/query').default
  }
]