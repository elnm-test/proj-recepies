import React, { Component } from 'react';
import Navbar from './Navbar';
import logo from '../styles/assets/imgs/logo.png';

export class Header extends Component {

    componentDidMount(){
        window.addEventListener('scroll', () => {
            const elHeader = document.querySelector('.app-header');
            elHeader.classList.toggle('scroll', window.scrollY > 0);
        })
    }


    render() {
        return (
            <header className="app-header">
                <Navbar />
                <div className="logo-wrapper flex row center">
                    <img className="img-logo" src={logo} alt="" />
                    <div className="title-logo">
                        FZ
                        <span>.</span>
                        <span>.</span>
                     </div>
                </div>
            </header>
        )
    }
}

export default Header;
