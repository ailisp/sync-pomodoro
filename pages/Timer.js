import React from 'react'
import { StyleSheet, View, Text, SafeAreaView } from 'react-native'
import { Button, Icon } from 'native-base'
import { d } from '../store'

export default function TimerPage({ state }) {
  return (
    <SafeAreaView style={styles.container}>
      <Timer
        status={state.getIn(['timer', 'status'])}
        finished={state.getIn(['timer', 'finished'])}
        started={state.getIn(['timer', 'started'])}
        remain={state.getIn(['timer', 'remain'])}
      />
    </SafeAreaView>
  )
}

function Timer({ status, remain, finished, started }) {
  return (
    <View>
      <Text style={styles.text}>{status}</Text>
      <Text style={styles.text}>{formatTime(remain)}</Text>
      <Text style={styles.text2}>Finished: {finished}</Text>
      <View style={styles.buttons}>
        {started ? (
          <Button onPress={() => d('endTimer')} rounded>
            <Icon name="controller-paus" type="Entypo" />
          </Button>
        ) : (
          <Button onPress={() => d('startTimer')} rounded>
            <Icon name="controller-play" type="Entypo" />
          </Button>
        )}
        <Button onPress={() => d('resetTimer')} title="Reset" rounded>
          <Icon name="controller-fast-backward" type="Entypo" />
        </Button>
        <Button onPress={() => d('nextTimer')} title="Next" rounded>
          <Icon name="controller-fast-forward" type="Entypo" />
        </Button>
        <Button onPress={() => d('resetFinished')} title="Reset" rounded>
          <Icon name="cw" type="Entypo" />
        </Button>
      </View>
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

const styles = StyleSheet.create({
  text: {
    fontSize: '40px',
    color: '#1aabdb',
  },
  text2: {
    fontSize: '36px',
    color: '#00c9b7',
  },
  container: {
    textAlign: 'center',
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: '#dae4f2',
    height: '100%',
  },
  button: {
    color: '#ffffff',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 300,
    maxWidth: 300,
    margin: 'auto',
  },
})
