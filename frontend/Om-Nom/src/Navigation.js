import React from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
        <div className="App-header">
            <h1 className="dm-serif" id="title">Foodie</h1>
            <div className="red-hat medium navs">
                <NavLink to="/foryou" className="navlink" activeClassName="bold">For You</NavLink>
                <NavLink to="/discover" className="navlink" activeClassName="bold">Discover</NavLink>
                <NavLink to="/profile"className="navlink" activeClassName="bold">Profile</NavLink>
            </div>
        </div>
    );
}
 
export default Navigation;