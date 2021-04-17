import React, { memo } from 'react'
import { Text } from 'react-native'

export const ViewComponent = memo(({ text2 }) => {
  console.log('enter ViewComponent')
  return <Text>{text2}</Text>
})
