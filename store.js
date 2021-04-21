// store.js
import React, { createContext, useReducer, useContext, useEffect } from 'react'
import * as events from './events'
import { Map, List } from 'immutable'
import { Platform } from 'react-native'
import router from './router'
import { init } from './effects'

export let timeOf = {
  work: 3,
  rest: 5,
}

const initialState = Map({
  timer: Map({
    finished: 0,
    startedAt: null,
    started: false,
    current: null,
    status: 'work',
    total: timeOf['work'],
    remain: timeOf['work'],
  }),
  text1: 'aaa',
  text2: 'bbb',
  path: Platform.OS == 'web' ? window.location.pathname : '/',
})
export const store = createContext(initialState)
const { Provider } = store

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    return events[action.type](state, action) || state
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

  useEffect(() => {
    init()
  }, [])
  return <Page state={state} />
}
