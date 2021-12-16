import './levi.config';
import '@/assets/css/index.less';

import dva from 'dva';

import { usersModel } from '@levi-a/user-models';

// import ReactDOM from 'react-dom';
import routes from './router';

// 1. Initialize
const app = dva();

// 2. Model
app.model({
  namespace: 'counter',
  state: { sum: 0 },
  reducers: {
    add(state: { sum: number; }) { return { sum: state.sum + 1 } },
    minus(state) { return { sum: state.sum - 1 } },
  },
});
app.model(usersModel);

// 3. View

// 4. Router
app.router(routes);

// 5. Start
app.start('#root');

// function App() {
//   return routes()
// }

// ReactDOM.render(
//   // <React.StrictMode>
//   <App />,
//   // </React.StrictMode>,
//   document.getElementById('root')
// )
