import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { ContextProvider } from 'src/components/_dashboard/Menu/MenuStore/Context-Provider';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import DashboardApp from './pages/DashboardApp';
import Promote from './pages/Promote';
import Menu from './pages/Menu';
import Settings from './pages/Settings';
import NotFound from './pages/Page404';
import MyOrders from './pages/MyOrders';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/dashboard', element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'my-orders', element: <MyOrders /> },
        { path: 'promote', element: <Promote /> },

        {
          path: 'menu',
          element: (
            <ContextProvider>
              <Menu />
            </ContextProvider>
          )
        },
        { path: 'settings', element: <Settings /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
