import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div
        style={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
        }}
      >
        <div style={{ width: '100vw', paddingRight: '300px' }}>
          <Outlet />
          <div
            style={{
              backgroundColor: 'red',
              height: '200px',
              width: '100%',
            }}
          >
            Footer
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'green',
            position: 'fixed',
            height: '100%',
            right: '0px',
            width: '300px',
          }}
        >
          Navbar
        </div>
      </div>
    </>
  );
}
