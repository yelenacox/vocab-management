import { Link, NavLink } from 'react-router-dom';
import './NavBar.scss';

export const NavBar = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="nav_body">
          <div className="logo_container">
            <li className="nav_logo">
              <NavLink className="nav_logo" to="/">
                FREE THE DATA
              </NavLink>
            </li>
          </div>
          <div className="nav_links">
            <li className="nav_link">
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li className="nav_link">
              <NavLink to="/help">Help</NavLink>
            </li>
            <li className="nav_link">
              <NavLink to="/about">About</NavLink>
            </li>
          </div>
        </ul>
      </nav>
    </>
  );
};
