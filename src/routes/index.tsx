import React from 'react'
import { useRoutes, RouteObject, Navigate } from 'react-router-dom'
import { MainLayout } from '../layout'
import { routeConfig } from './config'
import { cloneTree, visitTree } from '@hi-ui/utils'

const clonedRouteConfig = cloneTree(routeConfig)

visitTree(clonedRouteConfig, (node) => {
  if (node.component) {
    node.element = node.component
  }
  delete node.component
})

const routesConfigs: RouteObject[] = [
  {
    path: '/*',
    element: <MainLayout />,
    children: clonedRouteConfig.concat([
      {
        path: '*',
        element: <Navigate to="/search" replace={true} />,
      },
    ]),
  },
]

export const RootRoute: React.FC = () => {
  const Routes = useRoutes(routesConfigs)

  return Routes
}
