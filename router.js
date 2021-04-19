import Home from './pages/Home'
import TimerPage from './pages/Timer'
import { Page1 } from './pages/Page1'

let routeTable = {
  '/': TimerPage,
  '/page1': Page1,
}

export default function router(path) {
  return routeTable[path] || Home
}
