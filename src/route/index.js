export default {
  routes: [
    {
      path: '/',
      exact: true,
      component: require('../template/common-search').default
    },
    {
      path: '/common-search',
      component: require('../template/common-search').default
    },
    {
      path: '/common-basic',
      component: require('../template/common-basic').default
    },
    {
      path: '/query',
      component: require('../template/query').default
    },
    {
      path: '/query-basic',
      component: require('../template/query-basic').default
    },
    {
      path: '/toolbar',
      component: require('../template/toolbar').default
    },
    {
      path: '/toolbar-alter',
      component: require('../template/toolbar-alter').default
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
      path: '/tree-single-query',
      component: require('../template/tree-single-query').default
    },
    {
      path: '/tree-single',
      component: require('../template/tree-single').default
    },
    {
      path: '/tree-multiple-query',
      component: require('../template/tree-multiple-query').default
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
      path: '/form-group',
      component: require('../template/form-group').default
    },
    {
      path: '/form-with-stepper',
      component: require('../template/form-with-stepper').default
    },
    {
      path: '/form-unfold-group',
      component: require('../template/form-unfold-group').default
    },
    {
      path: '/form-vertical-group',
      component: require('../template/form-vertical-group').default
    },
    {
      path: '/form-double-column',
      component: require('../template/form-double-column').default
    },
    {
      path: '/form-basic',
      component: require('../template/form-basic').default
    },
    {
      path: '/form-modal',
      component: require('../template/form-modal').default
    },
    {
      path: '/home-dashboard',
      component: require('../template/home-dashboard').default
    },
    {
      path: '/home-workbench',
      component: require('../template/home-workbench').default
    },
    {
      path: '/home-portal',
      component: require('../template/home-portal').default
    },
    {
      path: '/home-search',
      component: require('../template/home-search').default
    }
  ]
}
