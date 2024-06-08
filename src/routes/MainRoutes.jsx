import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';
import PrivateRoute from './PrivateRoute';

// Lazy loading components
const ApprovedUsers = Loadable(lazy(() => import('pages/component-overview/approvedUsers')));
const PendingUsers = Loadable(lazy(() => import('pages/component-overview/pendingUsers')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// Render - sample page
const IPList = Loadable(lazy(() => import('pages/extra-pages/ip-List')));
const Blacklist = Loadable(lazy(() => import('pages/extra-pages/blacklist')));

// Main Routing
const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    {
      path: '/',
      element: <PrivateRoute element={<DashboardDefault />} />
    },
    {
      path: 'approvedUsers',
      element: <PrivateRoute element={<ApprovedUsers />} />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <PrivateRoute element={<DashboardDefault />} />
        }
      ]
    },
    {
      path: 'ip-List',
      element: <PrivateRoute element={<IPList />} />
    },
    {
      path: 'blacklist',
      element: <PrivateRoute element={<Blacklist />} />
    },
    {
      path: 'shadow',
      element: <PrivateRoute element={<Shadow />} />
    },
    {
      path: 'pendingUsers',
      element: <PrivateRoute element={<PendingUsers />} />
    }
  ]
};

export default MainRoutes;
