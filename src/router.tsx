import { createHashRouter } from 'react-router-dom';
import Products from './pages/Products';
import Product from './pages/Product';
import App from './App';
import Home from './pages/Home';
import CreateProduct from './pages/CreateProduct';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: '/product/:id',
        element: <Product />
      },
      {
        path: '/create-product',
        element: <CreateProduct />
      }
    ],
  },
]/*, {
  //basename: import.meta.env.BASE_URL 
}*/);