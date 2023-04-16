import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { Main } from './components/Main/Main';
import { Game } from './components/Game/Game';
import { Help } from './components/Help/Help';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Main /> },
        {
          path: 'game',
          element: <Game />,
        },
        {
          path: 'help',
          element: <Help />,
        },
      ],
    },
  ],
  { basename: '/mole-game' },
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
