import React from 'react';
import { createMemoryRouter } from 'react-router-dom';

const router = createMemoryRouter([
  {
    path: '/',
    element: <div>Hello world!</div>,
  },
]);

export default router;
