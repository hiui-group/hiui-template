const components = {}
const files = require.context('../template', true, /.js$/)
console.log('files', files)
console.log('files.keys()', files.keys())
files.keys().forEach(key => {
  let componentName = key.split('/')[1]
  let fileName = key.split('/')[2]
  // 引入对应模板的index.js页面文件，排除其他文件
  if (fileName === 'index.js') {
    // console.log(componentName)
    components[componentName] = files(key).default
  }
})

const config = [
  {
    name: '首页',
    children: [
      { name: '仪表盘', path: '/home-dashboard' },
      { name: '工作台', path: '/home-workbench' },
      { name: '门户', path: '/home-portal' }
    ]
  },
  {
    name: '表单',
    children: [
      {
        name: '单列',
        path: '/form-basic'
      },
      {
        name: '双列',
        path: '/form-double-column'
      },
      {
        name: '分组-标签',
        path: '/form-vertical-group'
      },
      {
        name: '分组-区块',
        path: '/form-group'
      },
      {
        name: '分组-组合',
        path: '/form-unfold-group'
      },
      {
        name: '分步骤',
        path: '/form-with-stepper'
      },
      {
        name: '弹窗表格',
        path: '/form-modal'
      }
    ]
  },
  {
    name: '表格',
    children: [
      {
        name: '通用-搜索',
        path: '/common-search'
      },
      {
        name: '通用-基础',
        path: '/common-basic'
      },
      { name: '查询-标准', path: '/query' },
      {
        name: '查询-基础',
        path: '/query-basic'
      },
      { name: '工具条-标准', path: '/toolbar' },
      {
        name: '工具条-固定',
        path: '/toolbar-alter'
      },
      {
        name: '分组-横向',
        path: '/group-horizontal'
      },
      {
        name: '分组-纵向',
        path: '/group-vertical'
      },
      {
        name: '分组-横向',
        path: '/tree-single-query'
      },
      {
        name: '分组-纵向',
        path: '/tree-single'
      },
      {
        name: '树形-多选-查询',
        path: '/tree-multiple-query'
      },
      {
        name: '树形-多选',
        path: '/tree-multiple'
      },
      {
        name: '平铺-单选',
        path: '/tile-single'
      },
      {
        name: '平铺-多选',
        path: '/tile-multiple'
      }
    ]
  },
  {
    name: '列表',
    children: [
      {
        name: '流程卡片',
        path: '/list-flow-card'
      },
      {
        name: '嵌入式',
        path: '/list-embeded'
      },
      {
        name: '信息流',
        path: '/list-info-flow'
      },
      {
        name: '卡片列表',
        path: '/list-task'
      },
      {
        name: '小卡片',
        path: '/list-indicator'
      }
    ]
  },
  {
    name: '详情页',
    children: [
      {
        name: '单列',
        path: '/detail-basic'
      },
      {
        name: '双列',
        path: '/detail-double-column'
      },
      {
        name: '分组',
        path: '/detail-group'
      },
      {
        name: '步骤',
        path: '/detail-stepper'
      },
      {
        name: '关联',
        path: '/detail-relevance'
      },
      {
        name: '卡片',
        path: '/detail-card'
      }
    ]
  },
  {
    name: '个人页',
    children: [
      {
        name: '账号中心',
        path: '/user-center'
      },
      {
        name: '活动信息-混合',
        path: '/user-dashboard'
      }
    ]
  },
  {
    name: '结果页',
    children: [
      {
        name: '服务器出错',
        path: '/result-server-error'
      },
      {
        name: '暂无数据',
        path: '/result-no-data'
      },
      {
        name: '暂无权限',
        path: '/result-no-auth'
      },
      {
        name: '网络中断',
        path: '/result-network-broken'
      },
      {
        name: '成功',
        path: '/result-success'
      },
      {
        name: '失败',
        path: '/result-failed'
      }
    ]
  }
]

const transformConfig = config => {
  config.forEach(c => {
    if (c.path) {
      c.component = components[c.path.split('/')[1]]
    }
    if (c.children) {
      transformConfig(c.children)
    }
  })
  return config
}
console.log('transformConfig(config)', transformConfig(config))
export default transformConfig(config)
