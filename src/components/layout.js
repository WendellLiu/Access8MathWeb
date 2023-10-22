import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <header>I am a Header</header>

      <Outlet />
    </div>
  );
};

export default Layout;
