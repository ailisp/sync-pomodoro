import React from 'react'
import { StateProvider, App_ } from './store.js'

export default function App() {
  return (
    <StateProvider>
      <App_ />
    </StateProvider>
  )
}
