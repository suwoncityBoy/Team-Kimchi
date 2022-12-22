import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <div
        style={{
          width: '100vw',
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
              position: 'absolute',
              bottom: '0',
            }}
          >
            Footer
          </div>
        </div>
        <div
          style={{
            backgroundColor: 'green',
            position: 'absolute',
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
