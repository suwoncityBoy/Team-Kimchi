import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

export default function Root() {
  return (
    <>
      <div
        style={{
          width: '100%',
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'row',
          position: 'relative',
        }}
      >
        <div
          style={{
            paddingRight: '150px',
            marginBottom: '12rem',
            width: '100%',
          }}
        >
          <Outlet />
          <Footer />
        </div>
        <Navbar />
      </div>
    </>
  );
}
