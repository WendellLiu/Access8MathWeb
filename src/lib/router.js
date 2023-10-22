import React from 'react';
import { createMemoryRouter } from 'react-router-dom';

import Home from '@/pages/home';
import Layout from '@/components/layout';

const router = createMemoryRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export default router;
