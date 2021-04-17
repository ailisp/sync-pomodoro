import React, { memo } from 'react'

export const ViewComponent = memo(({ text2 }) => {
  console.log('enter ViewComponent')
  return <p>{text2}</p>
})
