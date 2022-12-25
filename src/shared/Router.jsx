import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Root from '../pages/Root';
import NotFound from '../pages/NotFound';
import Home from '../pages/Home';
import Categories from '../pages/Categories';
// import Categories2 from '../pages/Categories2';
import ProductDetail from '../pages/ProductDetail';
import Description from '../components/DescriptionImage/DescriptionImage';
import Recipe from '../components/RecipeImage/RecipeImage';
import Review from '../components/Review/Review';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<NotFound />}>
      <Route path="/" element={<Home />} />
      <Route path="/categories/:id" element={<Categories />} />
      {/* <Route path="/categories/:id" element={<Categories2 />} /> */}
      <Route path="/kimchis/:id" element={<ProductDetail />}>
        <Route path="/kimchis/:id/description" element={<Description />} />
        <Route path="/kimchis/:id/recipe" element={<Recipe />} />
        <Route path="/kimchis/:id/review" element={<Review />} />
      </Route>
    </Route>,
  ),
);

export default Router;
