import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ToTopButton from '../components/ToTop/ToTop';

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
          <ToTopButton />
          <Footer />
        </div>
        <Navbar />y{' '}
      </div>
    </>
  );
}
