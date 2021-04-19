import React, { useEffect } from 'react'
import { StyleSheet, Button, View, Text } from 'react-native'
import { d } from '../store'
import { Audio } from 'expo-av'

export default function TimerPage({ state }) {
  return (
    <Timer
      status={state.getIn(['timer', 'status'])}
      remain={state.getIn(['timer', 'remain'])}
    />
  )
}

setInterval(() => d('tick', { timestamp: new Date() }))

function Timer({ status, remain }) {
  return (
    <View>
      <Text>{status}</Text>
      <Text>{formatTime(remain)}</Text>
      <Button onPress={() => d('startTimer')} title="Start" />
      <Button onPress={() => d('endTimer')} title="End" />
    </View>
  )
}

function formatTime(seconds) {
  let m = Math.floor(seconds / 60)
  let s = seconds - m * 60
  m = m.toString()
  if (m.length < 2) {
    m = '0' + m
  }
  s = s.toString()
  if (s.length < 2) {
    s = '0' + s
  }
  return m + ':' + s
}
