import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, selectToken } from "../features/auth/authSlice";
import birdLogo from '../assets/bird.webp'

import "./Navbar.less";

/**
 * A simple navigation bar that displays "Log In" if the user is not logged in,
 * and "Log Out" if the user is logged in.
 */
export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="top">
      <img className="bird-logo" src={birdLogo} />
      <h1 className="chirper-header">Chirper</h1>
      <menu>
        {token ? (
          <li className="navbar">
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/posts">Profile</NavLink>
            <a onClick={handleLogout}>Log Out</a>
          </li>
        ) : (
          <li className="navbar">
            <NavLink to="/login">Log In</NavLink>
          </li>
        )}
      </menu>
    </nav>
  );
}
