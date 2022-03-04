import { useCallback, useMemo } from 'react'
import { Menu, Breadcrumb, BreadcrumbItemProps, MenuDataItem } from '@hi-ui/hiui'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Header } from './header'

import styles from './index.module.scss'
import { FilterFilled, HomeFilled } from '@hi-ui/icons'

const routeConfig: any = [
  {
    name: '仪表盘',
    icon: <HomeFilled/>,
    children: [
      {
        name: '工作台',
      },
      {
        name: '数据分析',
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
    path: '/home'
  },
  {
    name: '关于',
    path: '/about'
  },
]

interface NavigableBreadcrumbItem extends BreadcrumbItemProps {
  path?: string
}

export const MainLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBreadcrumbClick = useCallback(
    (_, item: NavigableBreadcrumbItem) => {
      if (item.path) {
        navigate(item.path)
      }
    },
    [navigate]
  )

  const breadcrumbItems: any = useMemo(() => {
    return [
      { title: '首页', path: '/home' } as NavigableBreadcrumbItem,
      { title: 'appName' }
    ]
  }, [])

  // 传递给 Menu 组件的菜单数据
  const menuData = useMemo(() => {
    const traverse = (route: typeof routeConfig): MenuDataItem[] => {
      return route.map((v: any) => {
        const data: MenuDataItem = {
          id: v.path,
          title: v.name
        }
        if (v.children && v.children.length) {
          data.children = traverse(v.children)
        }
        return data
      })
    }

    return traverse(routeConfig)
  }, [])

  const handleMenuClick = (menuId: React.ReactText) => {
    console.log('menuId',menuId);
    navigate(menuId as string)
  }

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <Menu
            className={styles.menu}
            placement="vertical"
            showCollapse={true}
            defaultActiveId={location.pathname}
            activeId={location.pathname}
            data={menuData}
            onClick={handleMenuClick}
          />
        </div>
        <div className={styles.content}>
          {/* <div className={styles.breadcrumbWrapper}>
            <Breadcrumb data={breadcrumbItems} separator="/" onClick={handleBreadcrumbClick} />
          </div> */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
