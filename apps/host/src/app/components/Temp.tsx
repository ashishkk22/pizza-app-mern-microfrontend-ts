import React from 'react';
import { Outlet } from 'react-router-dom';

const Temp = () => {
  console.log('components claled');
  return (
    <div>
      Temp
      <Outlet />
    </div>
  );
};

export default Temp;
