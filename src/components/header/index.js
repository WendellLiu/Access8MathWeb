import React from 'react';

import Menu from './menu';

const Header = () => {
  return (
    <header className="fixed h-20 flex shadow-md md:shadow-lg bg-white text-md md:text-2xl font-bold inset-x-0 z-10 justify-around items-center">
      <h1>Access8Math</h1>

      <Menu />
    </header>
  );
};

export default Header;
