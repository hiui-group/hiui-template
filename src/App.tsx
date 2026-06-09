import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppStoreFilled } from '@hi-ui/icons'
import { TypicalPageAppFrame } from './typical-page-reuse/app-frame'
import typicalPageReuseRoutes from './typical-page-reuse/routes/config'

const typicalPageGalleryRoute = {
  title: '示例',
  path: 'examples',
  icon: <AppStoreFilled />,
  element: <Outlet />,
  children: typicalPageReuseRoutes,
}

const appRoutes = [
  {
    path: '/',
    element: <Navigate to="/examples/table/common/basic" replace />,
  },
  typicalPageGalleryRoute,
]

export default function App() {
  const element = useRoutes(appRoutes)
  return <TypicalPageAppFrame routes={[typicalPageGalleryRoute]}>{element}</TypicalPageAppFrame>
}
