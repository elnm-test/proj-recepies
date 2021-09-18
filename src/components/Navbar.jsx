import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export class Navbar extends Component {
    render() {
        return (
            <div className="navbar flex row center">
                <NavLink to="/ingredients" activeClassName="selected-section">Ingredients</NavLink>
                <NavLink to="/nutrients"  activeClassName="selected-section" >Nutrients</NavLink>
            </div>
        )
    }
}

export default Navbar;
