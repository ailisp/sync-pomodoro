import Home from './pages/Home'
import { Page1 } from './pages/Page1'

let routeTable = {
  '/': Home,
  '/page1': Page1,
}

export default function router(path) {
  return routeTable[path] || Home
}
