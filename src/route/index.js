import React from 'react'
import { SiderLayout } from '@hi-ui/classic-theme'
import { siders } from './siders'

export default [
  {
    path: '/',
    component: require('../template/home-dashboard').default,
    exact: true
  },
  {
    path: '/home',
    render: props => {
      return (
        <SiderLayout
          sider={siders.home}
          accordion={false}
          routes={[
            {
              path: '/home/home-dashboard',
              component: require('../template/home-dashboard').default
            },
            {
              path: '/home/home-workbench',
              component: require('../template/home-workbench').default
            },
            {
              path: '/home/home-portal',
              component: require('../template/home-portal').default
            },
            {
              path: '/home/home-search',
              component: require('../template/home-search').default
            }
          ]}
          {...props}
        />
      )
    }
  },
  {
    path: '/table',
    render: props => {
      return (
        <SiderLayout
          sider={siders.table}
          accordion={false}
          routes={[
            {
              path: '/table/common-search',
              component: require('../template/common-search').default
            },
            {
              path: '/table/common-basic',
              component: require('../template/common-basic').default
            },
            {
              path: '/table/query',
              component: require('../template/query').default
            },
            {
              path: '/table/query-basic',
              component: require('../template/query-basic').default
            },
            {
              path: '/table/toolbar',
              component: require('../template/toolbar').default
            },
            {
              path: '/table/toolbar-alter',
              component: require('../template/toolbar-alter').default
            },
            {
              path: '/table/basic',
              component: require('../template/basic').default
            },
            {
              path: '/table/group-horizontal',
              component: require('../template/group-horizontal').default
            },
            {
              path: '/table/group-vertical',
              component: require('../template/group-vertical').default
            },
            {
              path: '/table/tree-single-query',
              component: require('../template/tree-single-query').default
            },
            {
              path: '/table/tree-single',
              component: require('../template/tree-single').default
            },
            {
              path: '/table/tree-multiple-query',
              component: require('../template/tree-multiple-query').default
            },
            {
              path: '/table/tree-multiple',
              component: require('../template/tree-multiple').default
            },
            {
              path: '/table/tile-single',
              component: require('../template/tile-single').default
            },
            {
              path: '/table/tile-multiple',
              component: require('../template/tile-multiple').default
            }
          ]}
          {...props}
        />
      )
    }
  },
  {
    path: '/form',
    render: props => {
      return (
        <SiderLayout
          sider={siders.form}
          accordion={false}
          routes={[
            {
              path: '/form/form-group',
              component: require('../template/form-group').default
            },
            {
              path: '/form/form-with-stepper',
              component: require('../template/form-with-stepper').default
            },
            {
              path: '/form/form-unfold-group',
              component: require('../template/form-unfold-group').default
            },
            {
              path: '/form/form-vertical-group',
              component: require('../template/form-vertical-group').default
            },
            {
              path: '/form/form-double-column',
              component: require('../template/form-double-column').default
            },
            {
              path: '/form/form-basic',
              component: require('../template/form-basic').default
            },
            {
              path: '/form/form-modal',
              component: require('../template/form-modal').default
            }
          ]}
          {...props}
        />
      )
    }
  },

  {
    path: '/user',
    render: props => {
      return (
        <SiderLayout
          sider={siders.user}
          accordion={false}
          routes={[
            {
              path: '/user/user-center',
              component: require('../template/user-center').default
            },
            {
              path: '/user/user-dashboard',
              component: require('../template/user-dashboard').default
            }
          ]}
          {...props}
        />
      )
    }
  },
  // {
  //   path: '/loading',
  //   render: props => {
  //     return (
  //       <SiderLayout
  //         sider={siders.loading}
  //         accordion={false}
  //         routes={[
  //           {
  //             path: '/loading/normal-loading',
  //             component: require('../template/normal-loading').default
  //           }
  //         ]}
  //         {...props}
  //       />
  //     )
  //   }
  // },
  {
    path: '/result',
    render: props => {
      return (
        <SiderLayout
          sider={siders.result}
          accordion={false}
          routes={[
            {
              path: '/result/result-server-error',
              component: require('../template/result-server-error').default
            },
            {
              path: '/result/result-no-data',
              component: require('../template/result-no-data').default
            },
            {
              path: '/result/result-no-auth',
              component: require('../template/result-no-auth').default
            },
            {
              path: '/result/result-network-broken',
              component: require('../template/result-network-broken').default
            },
            {
              path: '/result/result-success',
              component: require('../template/result-success').default
            },
            {
              path: '/result/result-failed',
              component: require('../template/result-failed').default
            }
          ]}
          {...props}
        />
      )
    }
  },
  {
    path: '/list',
    render: props => {
      return (
        <SiderLayout
          sider={siders.list}
          accordion={false}
          routes={[
            {
              path: '/list/list-embeded',
              component: require('../template/list-embeded').default
            },
            {
              path: '/list/list-info-flow',
              component: require('../template/list-info-flow').default
            },
            {
              path: '/list/list-task',
              component: require('../template/list-task').default
            },
            {
              path: '/list/list-indicator',
              component: require('../template/list-indicator').default
            }
          ]}
          {...props}
        />
      )
    }
  },
  {
    path: '/detail',
    render: props => {
      return (
        <SiderLayout
          sider={siders.detail}
          routes={[
            {
              path: '/detail/detail-basic',
              component: require('../template/detail-basic').default
            },
            {
              path: '/detail/detail-double-column',
              component: require('../template/detail-double-column').default
            },
            {
              path: '/detail/detail-group',
              component: require('../template/detail-group').default
            },
            {
              path: '/detail/detail-stepper',
              component: require('../template/detail-stepper').default
            },
            {
              path: '/detail/detail-relevance',
              component: require('../template/detail-relevance').default
            },
            {
              path: '/detail/detail-card',
              component: require('../template/detail-card').default
            }
          ]}
          {...props}
        />
      )
    }
  }
]
