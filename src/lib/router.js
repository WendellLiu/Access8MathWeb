import React from 'react';
import { createMemoryRouter } from 'react-router-dom';

import Home from '@/pages/home';

const router = createMemoryRouter([
  {
    path: '/',
    element: <Home />,
  },
]);

export default router;
