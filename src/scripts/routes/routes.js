import Home from '../views/pages/home';
import DetailPage from '../views/pages/detailPage';
import List from '../views/pages/list';

const routes = {
  '/': Home,
  '/home': Home,
  '/detail/:id': DetailPage,
  '/list': List,
};

export default routes;
