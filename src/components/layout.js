import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './header';

const Layout = () => {
  return (
    <div>
      <Header />

      <main className="pt-20 md:h-screen w-screen ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
