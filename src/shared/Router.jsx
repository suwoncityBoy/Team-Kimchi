import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Root from '../pages/Root';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Categories from '../pages/Categories';
import ProductDetail from '../pages/ProductDetail';
import ReviewContainer from '../components/ReviewContainer/ReviewContainer';
import Cart from '../pages/Cart';
import DetailImage from '../components/DetailImage/DetailImage';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<NotFound />}>
      <Route path="/" element={<Home />} />
      <Route path="/categories/:id" element={<Categories />} />
      <Route path="/kimchis/:id" element={<ProductDetail />}>
        <Route path="/kimchis/:id/description" element={<DetailImage />} />
        <Route path="/kimchis/:id/recipe" element={<DetailImage />} />
        <Route path="/kimchis/:id/review" element={<ReviewContainer />} />
      </Route>
      <Route path="/cart" element={<Cart />} />
    </Route>,
  ),
);

export default Router;
