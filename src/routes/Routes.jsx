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
import FreelancerBids from '../pages/FreelancerBids';
import Home from '../pages/Home';
import JobCardDetails from '../pages/JobCardDetails';
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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/jobs/details/:id',
        element: (
          <PrivateRoute>
            <JobCardDetails></JobCardDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/jobs/${params.id}`),
      },
      {
        path: '/jobs/update/:id',
        element: (
          <PrivateRoute>
            <BuyerUpdateJob></BuyerUpdateJob>
          </PrivateRoute>
        ),
      },
      {
        path: '/freelancer-bids',
        element: (
          <PrivateRoute>
            <FreelancerBids></FreelancerBids>
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
    ],
  },
]);

export default router;
