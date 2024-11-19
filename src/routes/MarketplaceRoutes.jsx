import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Login from 'views/pages/authentication3/Login3';
import Register from 'views/pages/authentication3/Register3';
import ProtectedRoute from './ProtectedRoute';

// utilities routing

const UtilsSettings = Loadable(lazy(() => import('views/utilitiess/marketutilities/Settings')));
const UtilsAdvertise = Loadable(lazy(() => import('views/utilitiess/marketutilities/Advertise')));

const Marketplace = Loadable(lazy(() => import('views/marketplace')));

const MarketplaceRoutes = {
  path: '/',
  children: [
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
      path: '/',
      element: <ProtectedRoute element={<MainLayout />} />,
      children: [
        {
          path: 'marketplace',
          children: [
            { path: '', element: <Marketplace /> },
            // { path: 'payments', element: <UtilsPayments /> },
            // { path: 'view-papers', element: <UtilsViewPapers /> },
            // { path: 'users', element: <UtilsUsers /> },
            { path: 'advertise', element: <UtilsAdvertise /> },

            { path: 'settings', element: <UtilsSettings /> },
            // { path: 'courses', element: <UtilsCourseDetails /> },
            // { path: 'courses/course-details', element: <UtilsSingleCourseDetails /> }
          ]
        }
      ]
    }
  ]
};

export default MarketplaceRoutes;
