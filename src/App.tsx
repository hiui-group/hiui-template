import { BrowserRouter as RouterProvider } from 'react-router-dom'
import { RootRoute } from './routes'

const App = () => {
  return (
    <RouterProvider>
      <RootRoute />
    </RouterProvider>
  )
}

export default App
