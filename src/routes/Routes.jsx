import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root';
import AllJobs from '../pages/AllJobs';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import BidRequests from '../pages/BidRequests';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import HrAddJob from '../pages/HrAddJob';
import HrPostedJobs from '../pages/HrPostedJobs';
import JobDetails from '../pages/JobDetails';
import MyBids from '../pages/MyBids';
import UpdateJob from '../pages/UpdateJob';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/jobs',
        element: <AllJobs />,
      },
      {
        path: '/jobs/:id',
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
      },

      {
        path: '/update/:id',
        element: (
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        ),
      },
      {
        path: '/hr-add-job',
        element: (
          <PrivateRoute>
            <HrAddJob></HrAddJob>
          </PrivateRoute>
        ),
      },
      {
        path: '/my-bids',
        element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
      },
      {
        path: '/hr-posted-jobs',
        element: (
          <PrivateRoute>
            <HrPostedJobs></HrPostedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: '/bid-requests',
        element: (
          <PrivateRoute>
            <BidRequests />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);

export default router;
