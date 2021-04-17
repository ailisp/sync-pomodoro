import React, { memo } from 'react'
import { d } from '../store'
import { Button, Text, View } from 'react-native'

export const ExampleComponent = memo(({ text1 }) => {
  console.log('enter ExampleComponent')
  return (
    <View>
      <Text>{text1}</Text>
      <Button onPress={() => d('toplevelEvent1')} title="click" />
    </View>
  )
})

export const ConstComponent = memo(() => {
  console.log('enter ConstComponent')
  return <Text>{'bbb'}</Text>
})
