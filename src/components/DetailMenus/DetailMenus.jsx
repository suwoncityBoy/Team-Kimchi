import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function KimchiDetail() {
  return (
    <ul style={menuStyle}>
      {/* 상품설명 */}
      <li style={listStyle}>
        <NavLink
          to="/kimchis/kimchi1/description"
          style={({ isActive }) =>
            isActive ? activeLinkStyle : inactiveLinkStyle
          }
        >
          상품설명
        </NavLink>
      </li>
      {/* 레시피 */}
      <li style={listStyle}>
        <NavLink
          to="/kimchis/kimchi1/recipe"
          style={({ isActive }) =>
            isActive ? activeLinkStyle : inactiveLinkStyle
          }
        >
          레시피
        </NavLink>
      </li>
      {/* 후기 */}
      <li style={listStyle}>
        <NavLink
          to="/kimchis/kimchi1/review"
          style={({ isActive }) =>
            isActive ? activeLinkStyle : inactiveLinkStyle
          }
        >
          후기
        </NavLink>
      </li>
    </ul>
  );
}

const menuStyle = {
  width: '100%',
  padding: '10px',
  boxSizing: 'border-box',
  display: 'flex',
  margin: '30px 0',
};

const listStyle = {
  border: '1px solid #c2c2c2',
  textAlign: 'center',
  flex: '1 1 auto',
};

const activeLinkStyle = {
  display: 'block',
  padding: '20px 0',
  textDecoration: 'none',
  color: 'black',
  fontSize: '16px',
};

const inactiveLinkStyle = {
  backgroundColor: '#eeeeee',
  display: 'block',
  padding: '20px 0',
  textDecoration: 'none',
  color: 'black',
  fontSize: '16px',
};
