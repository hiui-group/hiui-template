import { useCallback, useMemo } from 'react'
import { Menu, Breadcrumb, BreadcrumbItemProps, MenuItemProps } from '@hi-ui/hiui'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Header } from './header'

import styles from './index.module.scss'

const routeConfig: any = [
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
    const traverse = (route: typeof routeConfig): MenuItemProps[] => {
      return route.map((v: any) => {
        const data: MenuItemProps = {
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
