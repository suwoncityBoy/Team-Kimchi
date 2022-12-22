import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Root from '../pages/Root';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import MyPage from '../pages/MyPage';
import Product from '../pages/Product';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<NotFound />}>
      <Route path="/" element={<Home />} />
      <Route path="/kimchis/:id" element={<Product />} />
    </Route>,
  ),
);

export default Router;
