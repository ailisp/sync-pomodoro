// store.js
import React, { createContext, useReducer, useContext } from 'react'
import * as events from './events'
import { Map, List } from 'immutable'
import { Platform } from 'react-native'
import router from './router'

const initialState = Map({
  text1: 'aaa',
  text2: 'bbb',
  path: Platform.OS == 'web' ? window.location.pathname : '/',
})
export const store = createContext(initialState)
const { Provider } = store

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    return events[action.type](state, action)
  }, initialState)
  return <Provider value={{ state, dispatch }}>{children}</Provider>
}

let _d = (e) => {}

export function d(type, args = {}) {
  _d({ ...args, type })
}

if (Platform.OS == 'web') {
  window.d = d
}

export function App_() {
  let { state, dispatch } = useContext(store)
  _d = dispatch

  if (Platform.OS == 'web') {
    window.state = state
  }
  let Page = router(state.get('path'))
  return <Page state={state} />
}
