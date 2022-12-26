import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './shared/Router';
import store from './redux/config/configStore';
import { Provider } from 'react-redux';
export default function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}
