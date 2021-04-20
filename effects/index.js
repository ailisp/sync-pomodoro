import { Audio } from 'expo-av'
let workFinishSound
let restFinishSound

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
