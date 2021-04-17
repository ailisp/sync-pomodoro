import { d } from '../store'
import { Platform } from 'react-native'

export const toplevelEvent1 = (state, _args) => {
  return state.set('text2', 'ccc')
}

export const goPath = (state, { path }) => {
  if (Platform.OS == 'web') {
    const url = new URL(window.location)
    url.pathname = path
    window.history.pushState({}, '', url)
  }

  return state.set('path', path)
}

export const _setState = (_state, { newState }) => {
  return newState
}

if (Platform.OS == 'web') {
  window.setState = (newState) => {
    d('_setState', { newState })
  }
}
