import { d, timeOf } from '../store'
import { Platform } from 'react-native'
import { play } from '../effects'

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

export const tick = (state, { timestamp }) => {
  if (state.getIn(['timer', 'started'])) {
    let current = timestamp
    let remain =
      state.getIn(['timer', 'total']) -
      Math.floor((current - state.getIn(['timer', 'startedAt'])) / 1000)
    if (remain >= 0) {
      return state
        .setIn(['timer', 'current'], current)
        .setIn(['timer', 'remain'], remain)
    } else {
      let finish = state.getIn(['timer', 'status'])
      play(finish)
      status = finish == 'work' ? 'rest' : 'work'
      remain = timeOf[status]
      let newState = state
        .setIn(['timer', 'current'], current)
        .setIn(['timer', 'remain'], remain)
        .setIn(['timer', 'status'], status)
        .setIn(['timer', 'total'], remain)
        .setIn(['timer', 'startedAt'], current)
      if (finish == 'work') {
        newState = newState.updateIn(['timer', 'finished'], (f) => f + 1)
      }
      return newState
    }
  }
}
export const startTimer = (state, _) => {
  if (!state.getIn(['timer', 'started'])) {
    return state.set(
      'timer',
      state.get('timer').set('started', true).set('startedAt', new Date())
    )
  }
}
export const endTimer = (state, _) => {
  if (state.getIn(['timer', 'started'])) {
    return state
      .setIn(['timer', 'started'], false)
      .setIn(['timer', 'startedAt'], null)
      .setIn(['timer', 'total'], state.getIn(['timer', 'remain']))
  }
}
export const resetTimer = (state, _) => {
  if (state.getIn(['timer', 'started'])) {
    return state
      .setIn(['timer', 'startedAt'], new Date())
      .setIn(['timer', 'remain'], timeOf[state.getIn(['timer', 'status'])])
      .setIn(['timer', 'total'], timeOf[state.getIn(['timer', 'status'])])
  } else {
    return state
      .setIn(['timer', 'total'], timeOf[state.getIn(['timer', 'status'])])
      .setIn(['timer', 'remain'], timeOf[state.getIn(['timer', 'status'])])
  }
}
export const nextTimer = (state, _) => {
  let newState
  if (state.getIn(['timer', 'status']) == 'work') {
    newState = state
      .updateIn(['timer', 'finished'], (f) => f + 1)
      .setIn(['timer', 'status'], 'rest')
  } else {
    newState = state.setIn(['timer', 'status'], 'work')
  }
  newState = resetTimer(newState)
  return newState
}
