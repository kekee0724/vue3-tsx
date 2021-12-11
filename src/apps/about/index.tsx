import React, { useEffect } from 'react';

import { Button } from 'antd-mobile';

import { get } from '../../core/utils';

export default function About() {
  console.log('import.meta.env', import.meta.env)
  useEffect(() => {
    get('/index-infos').then(() => {

    })
  }, [])
  return <div>
    <Button color='primary'>About</Button>
  </div>
}