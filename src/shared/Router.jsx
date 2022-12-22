import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Root from '../pages/Root';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import MyPage from '../pages/MyPage';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Root />} errorElement={<NotFound />}>
      <Route path="/" element={<Home />} />
      <Route path="/kimchis" element={<MyPage />} />
      <Route path="/kimchis/:id" element={<MyPage />} />
    </Route>,
  ),
);

export default Router;
