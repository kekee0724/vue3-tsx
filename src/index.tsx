import '@/assets/css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import routes from './router';

function App() {
  return routes()
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
