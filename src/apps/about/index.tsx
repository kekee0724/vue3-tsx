import React, { useEffect } from 'react';

import { Button } from 'antd-mobile';

import { get } from '../../core/utils';

function About() {
  useEffect(() => {
    get('/index-infos').then((res) => {
      console.log(res)
    });
  }, []);
  return (<div>
    <Button color='primary'>About</Button>
  </div>)
}

export default About
