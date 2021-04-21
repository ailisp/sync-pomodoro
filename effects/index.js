import { Audio } from 'expo-av'
import { fromJS } from 'immutable'
import socketIOClient from 'socket.io-client'
import { d } from '../store'

const ENDPOINT = 'http://192.168.0.114:4000'
const socket = socketIOClient(ENDPOINT)
let workFinishSound
let restFinishSound

export async function init() {
  socket.on('state', (timerState) => {
    console.log('on state')
    d('timerState', timerState)
  })
  socket.emit('getState')
  setInterval(() => d('tick', { timestamp: new Date() }))
}

export async function play(kind) {
  if (kind == 'work') {
    if (!workFinishSound) {
      workFinishSound = (
        await Audio.Sound.createAsync(require('../assets/work.mp3'))
      ).sound
    }
    await workFinishSound.playAsync()
  } else if (kind == 'rest') {
    if (!restFinishSound) {
      restFinishSound = (
        await Audio.Sound.createAsync(require('../assets/rest.mp3'))
      ).sound
    }
    await restFinishSound.playAsync()
  }
}

export async function broadcastState(state) {
  socket.emit('setState', state.toJS())
}
