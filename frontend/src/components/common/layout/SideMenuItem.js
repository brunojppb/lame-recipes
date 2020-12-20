import React from 'react';
import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';

export default function SideMenuItem({to, ...props}) {
  const location = useLocation();
  const activeClass = location.pathname === to ? 'bg-gray-700' : 'bg-gray-900'
  return (
    <Link to={to}
      className={`${activeClass} flex items-center gap-2 text-white p-2 rounded mt-2 cursor-pointer hover:bg-gray-700 hover:text-blue-300`}>
      {props.children}
    </Link>
  )
}

SideMenuItem.propTypes = {
  to: PropTypes.string.isRequired,
}