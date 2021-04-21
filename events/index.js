import { d, timeOf } from '../store'
import { Platform } from 'react-native'
import { play, broadcastState } from '../effects'
import { fromJS } from 'immutable'

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
  let newState = state
  if (
    new Date(timestamp).getHours() == 0 &&
    new Date(newState.getIn(['timer', 'current'])).getHours() == 23
  ) {
    newState = newState.setIn(['timer', 'finished'], 0)
  }
  if (newState.getIn(['timer', 'started'])) {
    let current = timestamp
    let remain = calcRemain(
      newState.getIn(['timer', 'total']),
      current,
      newState.getIn(['timer', 'startedAt'])
    )

    if (remain >= 0) {
      return newState.setIn(['timer', 'current'], current)
    } else {
      let finish = newState.getIn(['timer', 'status'])
      play(finish)
      status = finish == 'work' ? 'rest' : 'work'
      let total = timeOf[status]
      newState = newState
        .setIn(['timer', 'current'], current)
        .setIn(['timer', 'status'], status)
        .setIn(['timer', 'total'], total)
        .setIn(['timer', 'startedAt'], current)
      if (finish == 'work') {
        newState = newState.updateIn(['timer', 'finished'], (f) => f + 1)
      }
      return newState
    }
  } else {
    return newState
  }
}
export const startTimer = (s, _) => {
  let state = s
  if (!state.getIn(['timer', 'started'])) {
    state = state.set(
      'timer',
      state.get('timer').set('started', true).set('startedAt', new Date())
    )
    broadcastState(state)
    return state
  }
}
export function calcRemain(total, current, startedAt) {
  return (
    total -
    (current && startedAt ? Math.floor((current - startedAt) / 1000) : 0)
  )
}
export const endTimer = (s, _) => {
  let state = s
  if (state.getIn(['timer', 'started'])) {
    state = state
      .setIn(['timer', 'started'], false)
      .setIn(['timer', 'startedAt'], null)
      .setIn(
        ['timer', 'total'],
        calcRemain(
          state.getIn(['timer', 'total']),
          current,
          state.getIn(['timer', 'startedAt'])
        )
      )
    broadcastState(state)
    return state
  }
}
function reset(state) {
  if (state.getIn(['timer', 'started'])) {
    return state
      .setIn(['timer', 'startedAt'], new Date())
      .setIn(['timer', 'total'], timeOf[state.getIn(['timer', 'status'])])
  } else {
    return state.setIn(
      ['timer', 'total'],
      timeOf[state.getIn(['timer', 'status'])]
    )
  }
}
export const resetTimer = (s, _) => {
  let state = reset(s)
  broadcastState(state)
  return state
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
  newState = reset(newState)
  broadcastState(state)
  return newState
}
export const timerState = (state, timerState) => {
  let timer = fromJS(timerState).delete('type')
  return state.mergeDeep({ timer })
}
