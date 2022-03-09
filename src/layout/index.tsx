import { useMemo } from 'react'
import { Menu } from '@hi-ui/hiui'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Header } from './header'
import { routeConfig } from '../routes/config'
import { cloneTree, visitTree } from '@hi-ui/utils'

import styles from './index.module.scss'

export const MainLayout: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

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
          <Outlet />
        </div>
      </div>
    </div>
  )
}
