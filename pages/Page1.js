import { d } from '../store'
import React from 'react'

export const Page1 = ({ state }) => {
  return (
    <div>
      <h1>This is a html page</h1>
      <p style={{ color: 'blue' }}>use css</p>
      <button onClick={() => d('goPath', { path: '/' })}>go home</button>
      <a href="/">go home</a>
    </div>
  )
}
