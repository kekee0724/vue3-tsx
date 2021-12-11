import React from 'react'
import { Button } from 'antd-mobile'

export default function About() {
  console.log('import.meta.env', import.meta.env)
  return <div>
    <Button color='primary'>About</Button>
  </div>
}