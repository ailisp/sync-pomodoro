import React, { useEffect } from 'react'
import { StyleSheet, Button, View, Text } from 'react-native'
import { d } from '../store'
import { calcRemain } from '../events'

export default function TimerPage({ state }) {
  return (
    <Timer
      status={state.getIn(['timer', 'status'])}
      finished={state.getIn(['timer', 'finished'])}
      started={state.getIn(['timer', 'started'])}
      total={state.getIn(['timer', 'total'])}
      startedAt={state.getIn(['timer', 'startedAt'])}
      current={state.getIn(['timer', 'current'])}
    />
  )
}

function Timer({ status, startedAt, current, total, finished, started }) {
  return (
    <View>
      <Text>{status}</Text>
      <Text>{formatTime(calcRemain(total, current, startedAt))}</Text>
      <Text>Finished: {finished}</Text>
      {started ? (
        <Button onPress={() => d('endTimer')} title="End" />
      ) : (
        <Button onPress={() => d('startTimer')} title="Start" />
      )}
      <Button onPress={() => d('resetTimer')} title="Reset" />
      <Button onPress={() => d('nextTimer')} title="Next" />
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
