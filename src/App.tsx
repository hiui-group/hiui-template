import {HashRouter} from 'react-router-dom'
import { Copy } from './components/copy'
import { RootRoute } from './routes'

const App = () => {
  return (
    <HashRouter>
      <RootRoute />
      <Copy />
    </HashRouter>
  )
}

export default App
