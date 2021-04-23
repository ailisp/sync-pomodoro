import { Audio } from 'expo-av'
import { fromJS } from 'immutable'
import socketIOClient from 'socket.io-client'
import { d } from '../store'
var accurateInterval = require('accurate-interval')

const ENDPOINT = 'http://timer.carrymusic.club'
const socket = socketIOClient(ENDPOINT)
let workFinishSound
let restFinishSound

export async function init() {
  socket.on('state', (timerState) => {
    console.log('on state')
    d('timerState', timerState)
  })

  socket.emit('getState')
  accurateInterval(() => d('tick', { timestamp: new Date() }), 1000, {
    aligned: true,
    immediate: true,
  })
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
  socket.emit('setState', state.get('timer').toJS())
}
