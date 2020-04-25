import React from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import blank from './img/blank.png'; 
 
const Navigation = () => {
    return (
        <div className="App-header">
            <h1 className="Dm-serif" id="title">Om Nom</h1>
            <div className="Red-hat Medium Navs">
                <NavLink to="/foryou" className="Navlink" activeClassName="Bold">For You</NavLink>
                <NavLink to="/discover" className="Navlink" activeClassName="Bold">Discover</NavLink>
                <NavLink to="/profile"className="Navlink" activeClassName="Bold">Profile</NavLink>
            </div>
            <div className="User-interaction">
                <input
                    type="text"
                    className="Red-hat Medium"
                    style={{
                        width: "10vw",
                        margin: "10px"
                    }}
                    name="search"
                    placeholder="I want to cook... "
                    //value={this.state.search}
                    //onChange={this.onChange}
                    />
                <button style={{
                        margin: "10px"
                    }}>New Post</button>
                <img className="Dp-pic" src={blank} alt="blank" />
            </div>
        </div>
    );
}
 
export default Navigation;