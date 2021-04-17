import React from 'react'
import { StyleSheet, Button, View } from 'react-native'
import {
  ExampleComponent,
  ConstComponent,
} from '../components/ExampleComponent'
import { ViewComponent } from '../components/ViewComponent'
import { d } from '../store'

export default function Home({ state }) {
  return (
    <View style={styles.container}>
      <ExampleComponent text1={state.get('text1')} />
      <ViewComponent text2={state.get('text2')} />
      <ConstComponent />
      <Button
        onPress={() => d('goPath', { path: '/page1' })}
        title="go page1"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
