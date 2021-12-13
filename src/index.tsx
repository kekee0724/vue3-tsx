import '@/assets/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import routes from './router';
import IRouter from './apps/demo/router'


function App() {
  return routes()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    {/* <IRouter /> */}
  </React.StrictMode>,
  document.getElementById('root')
)
