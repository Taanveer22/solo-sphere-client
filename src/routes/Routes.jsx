import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root';
import AllJobs from '../pages/AllJobs';
import Login from '../pages/Authentication/Login';
import Register from '../pages/Authentication/Register';
import BuyerAddJob from '../pages/BuyerAddJob';
import BuyerBidRequests from '../pages/BuyerBidRequests';
import BuyerPostedJobs from '../pages/BuyerPostedJobs';
import BuyerUpdateJob from '../pages/BuyerUpdateJob';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import JobDetails from '../pages/JobDetails';
import MyBids from '../pages/MyBids';
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
        path: '/allJobs',
        element: <AllJobs />,
      },
      {
        path: '/jobs/:id',
        element: (
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`),
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
        path: '/update/:id',
        element: (
          <PrivateRoute>
            <BuyerUpdateJob></BuyerUpdateJob>
          </PrivateRoute>
        ),
      },
      {
        path: '/buyer-add-job',
        element: (
          <PrivateRoute>
            <BuyerAddJob></BuyerAddJob>
          </PrivateRoute>
        ),
      },

      {
        path: '/buyer-posted-jobs',
        element: (
          <PrivateRoute>
            <BuyerPostedJobs></BuyerPostedJobs>
          </PrivateRoute>
        ),
      },
      {
        path: '/buyer-bid-requests',
        element: (
          <PrivateRoute>
            <BuyerBidRequests></BuyerBidRequests>
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
