import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import Login from 'views/pages/authentication3/Login3';
import Register from 'views/pages/authentication3/Register3';
import ProtectedRoute from './ProtectedRoute';

// utilities routing
const UtilsPayments = Loadable(lazy(() => import('views/utilitiess/academyUtilities/Payments')));
const UtilsViewPapers = Loadable(lazy(() => import('views/utilitiess/academyUtilities/ViewSavedPaper')));
const UtilsUsers = Loadable(lazy(() => import('views/utilitiess/academyUtilities/Users')));
const UtilsSettings = Loadable(lazy(() => import('views/utilitiess/academyUtilities/Settings')));
const UtilsCourseDetails = Loadable(lazy(() => import('views/utilitiess/academyUtilities/CourseDetails')));
const UtilsSingleCourseDetails = Loadable(lazy(() => import('views/utilitiess/academyUtilities/SingleCourseDetails')));
const Academy = Loadable(lazy(() => import('views/academy')));

const AcademyRoutes = {
  path: '/',
  children: [
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
    {
      path: '/',
      element: <ProtectedRoute element={<MainLayout />} />,
      children: [
        {
          path: 'academy',
          children: [
            { path: '', element: <Academy /> },
            { path: 'payments', element: <UtilsPayments /> },
            { path: 'view-papers', element: <UtilsViewPapers /> },
            { path: 'users', element: <UtilsUsers /> },
            { path: 'settings', element: <UtilsSettings /> },
            { path: 'courses', element: <UtilsCourseDetails /> },
            { path: 'courses/course-details', element: <UtilsSingleCourseDetails /> }
          ]
        }
      ]
    }
  ]
};

export default AcademyRoutes;
