import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Root from '../pages/Root';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import ProductDetail from '../pages/ProductDetail';
import Categories from '../pages/Categories';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<NotFound />}>
      <Route path="/" element={<Home />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:id" element={<Categories />} />
      <Route path="/kimchis/:id" element={<ProductDetail />} />
    </Route>,
  ),
);

export default Router;
