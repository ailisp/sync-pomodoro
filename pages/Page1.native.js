import { d } from '../store'
import React from 'react'
import { Button, View, Text } from 'react-native'

export const Page1 = ({ state }) => {
  return (
    <View>
      <Text>This is a react native page</Text>
      <Text>Use react native style sheets</Text>
      <Button onPress={() => d('goPath', { path: '/' })} title="go home" />
    </View>
  )
}
