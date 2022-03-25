import { FilterFilled, HomeFilled } from '@hi-ui/icons'
import * as Pages from '../views'

export const routeConfig: any[] = [
  {
    name: '仪表盘',
    icon: <HomeFilled />,
    children: [
      {
        name: '工作台',
        path: 'dashboard-workbench',
        component: <Pages.DashboardWorkbench />,
      },
      {
        name: '数据分析',
        path: 'dashboard-data-analysis',
        component: <Pages.DashboardDataAnalysis />,
      },
    ],
  },
  {
    name: '表格',
    icon: <FilterFilled />,
    children: [
      {
        name: '查询表格',
        path: 'table-search',
        component: <Pages.TableSearch />,
      },
      {
        name: '统计表格',
        path: 'table-stat',
        component: <Pages.TableStat />,
      },
      {
        name: '左树右表',
        path: 'table-layout',
        component: <Pages.TableLayout />,
      },
      {
        name: '详情表格',
        path: 'table-detail',
        component: <Pages.TableDetail />,
      },
      {
        name: '卡片表格',
        path: 'table-card',
        component: <Pages.TableCard />,
      },
    ],
  },
  {
    name: '表单',
    icon: <HomeFilled />,
    children: [
      {
        name: '基础表单',
        path: 'form-basic',
        component: <Pages.FormBasic />,
      },
      {
        name: '分组表单',
        path: 'form-group',
        component: <Pages.FormGroup />,
      },
      {
        name: '分步表单',
        path: 'form-steps',
        component: <Pages.FormSteps />,
      },
    ],
  },
  {
    name: '详情',
    icon: <HomeFilled />,
    children: [
      {
        name: '基础详情',
        path: 'detail-basic',
        component: <Pages.DetailBasic />,
      },
      {
        name: '高级详情',
        path: 'detail-advance',
        component: <Pages.DetailAdvance />,
      },
    ],
  },
  {
    name: '流程',
    icon: <HomeFilled />,
    children: [
      {
        name: '审批',

        path: 'flow-approval',
        component: <Pages.FlowApproval />,
      },
      {
        name: '流程',
        path: 'flow-steps',
        component: <Pages.FlowSteps />,
      },
    ],
  },
  {
    name: '结果',
    icon: <HomeFilled />,
    children: [
      {
        name: '成功',
        path: 'result-success',
        component: <Pages.ResultSuccess />,
      },
      {
        name: '失败',
        path: 'result-failure',
        component: <Pages.ResultFailure />,
      },
    ],
  },
  {
    name: '异常',
    icon: <HomeFilled />,
    children: [
      {
        name: '无网络',
        path: 'exception-network',
        component: <Pages.ExceptionNetwork />,
      },
      {
        name: '无权限',
        path: 'exception-permission',
        component: <Pages.ExceptionPermission />,
      },
      {
        name: '404',
        path: 'exception-notfound',
        component: <Pages.ExceptionNotfound />,
      },
      {
        name: '500',
        path: 'exception-server-error',
        component: <Pages.ExceptionServerError />,
      },
    ],
  },
  {
    name: '个人',
    icon: <HomeFilled />,
    children: [
      {
        name: '个人中心',
        path: 'account-profile',
        component: <Pages.AccountProfile />,
      },
      {
        name: '设置',
        path: 'account-settings',
        component: <Pages.AccountSettings />,
      },
      {
        name: '消息中心',
        path: 'account-messages',
        component: <Pages.AccountMessages />,
      },
      {
        name: '待办',
        path: 'account-todo-list',
        component: <Pages.AccountTodoList />,
      },
    ],
  },
  {
    name: '首页',
    path: 'home',
    component: <Pages.Home />,
  },
  {
    name: '关于',
    path: 'about',
    component: <Pages.About />,
  },
]
