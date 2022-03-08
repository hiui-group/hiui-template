import { useCallback, useMemo } from 'react'
import { Menu, Breadcrumb, BreadcrumbItemProps, MenuDataItem } from '@hi-ui/hiui'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Header } from './header'
import { FilterFilled, HomeFilled } from '@hi-ui/icons'
import { routeConfig } from '../routes/config'
import { cloneTree, visitTree } from '@hi-ui/utils'

import styles from './index.module.scss'

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
    const clonedRouteConfig = cloneTree(routeConfig)

    visitTree(clonedRouteConfig, (node) => {
      node.id =  node.path ? ('/' + node.path) : node.name
      node.title = node.name

      delete node.component
    })

    return clonedRouteConfig
  }, [])

  const handleMenuClick = (menuId: React.ReactText) => {
    console.log('menuId',menuId);
    navigate(menuId as string)
  }

  console.log('location', location, menuData);

  return (
    <div className={styles.root}>
      <Header />
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <Menu
            className={styles.menu}
            placement="vertical"
            showCollapse={true}
            data={menuData}
            activeId={location.pathname}
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
