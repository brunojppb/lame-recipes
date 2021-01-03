import PropTypes from 'prop-types';
import {Link, useLocation} from 'react-router-dom';

export default function NavbarItem({to, ...props}) {
  const location = useLocation();
  const activeClass = location.pathname === to ? 'bg-gray-700' : 'bg-gray-900'
  return (
    <Link to={to}
      className={`${activeClass} flex items-center flex-col md:flex-row flex-grow gap-2 text-white p-2 rounded cursor-pointer hover:bg-gray-700 hover:text-blue-300 justify-content-center`}>
      {props.children}
    </Link>
  )
}

NavbarItem.propTypes = {
  to: PropTypes.string.isRequired,
}