import React from 'react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Home from '@/pages/home';
import Layout from '@/components/layout';

const Router = () => {
  return (
    <MemoryRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
      </Routes>
    </MemoryRouter>
  );
};

export default Router;
