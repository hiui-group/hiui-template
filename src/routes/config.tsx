import { FilterFilled, HomeFilled } from '@hi-ui/icons'
import * as Pages from '../views'

export const routeConfig: any[] = [
  {
    name: '仪表盘',
    icon: <HomeFilled/>,
    children: [
      {
        name: '工作台',
        path: 'workbench',
        component: <Pages.Home />
      },
      {
        name: '数据分析',
        path: 'dashboard'
      }
    ]
  },
  {
    name: '列表',
    icon: <FilterFilled />,
    children: [
      {
        name: '查询表格',
      },
      {
        name: '统计表格',
      },
      {
        name: '左树右表',
      },
      {
        name: '详情表格',
      },
      {
        name: '卡片表格',
      }
    ]
  },
  {
    name: '表单',
    icon: <HomeFilled/>,
    children: [
      {
        name: '基础表单',
      },
      {
        name: '分组表单',
      },
      {
        name: '分布表单',
      }
    ]
  },
  {
    name: '详情',
    icon: <HomeFilled/>,
    children: [
      {
        name: '基础详情',
      },
      {
        name: '高级详情',
      }
    ]
  },
  {
    name: '流程',
    icon: <HomeFilled/>,
    children: [
      {
        name: '审批',
      },
      {
        name: '流程',
      }
    ]
  },
  {
    name: '结果',
    icon: <HomeFilled/>,
    children: [
      {
        name: '成功',
      },
      {
        name: '失败',
      }
    ]
  },
  {
    name: '异常',
    icon: <HomeFilled/>,
    children: [
      {
        name: '无网络',
      },
      {
        name: '无权限',
      },
      {
        name: '404',
      },
      {
        name: '500',
      }
    ]
  },
  {
    name: '个人',
    icon: <HomeFilled/>,
    children: [
      {
        name: '个人中心',
      },
      {
        name: '设置',
      },
      {
        name: '消息中心',
      },
      {
        name: '待办',
      }
    ]
  },
  {
    name: '首页',
    path: 'home',
    component: <Pages.Home />
  },
  {
    name: '关于',
    path: 'about',
    component: <Pages.About />
  },
]
