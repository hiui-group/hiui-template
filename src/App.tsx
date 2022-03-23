import { BrowserRouter as RouterProvider } from 'react-router-dom'
// import { Copy } from './components/copy'
import { RootRoute } from './routes'

const App = () => {
  return (
    <RouterProvider>
      <RootRoute />
      {/* <Copy /> */}
    </RouterProvider>
  )
}

export default App
