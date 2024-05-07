import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { NavLink, useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const logoutHandler = (event) => {
        event.preventDefault();
        navigate('/');
        auth.logout();
        
    }
    return( 
    <nav>
        <div className="nav-wrapper" style={{ backgroundColor: 'orange'}}>
          <a href="/" className="brand-logo" style={{marginLeft: 25}}>Сокрашение ссылок</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><NavLink to="/create">Создать</NavLink></li>
            <li><NavLink to="/links">Ссылки</NavLink></li>
            <li><NavLink to="/" onClick={logoutHandler}>Выйти</NavLink></li>
          </ul>
        </div>
      </nav>
    )
}