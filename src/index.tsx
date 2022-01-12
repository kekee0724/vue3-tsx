import './reco.config';
import './assets/css/index.less';

import dva from 'dva';

import routes from './router';

// 1. Initialize
const app = dva();
// const app = dva({ history: createHistory() });

// 2. Model
// 3. View

// 4. Router
app.router(routes as any);

// 5. Start
app.start('#root');


