import React from 'react'
import { useState } from 'react';
import styles from './Navbar.module.css';
import './nav.css';

const Navbar =()=>{
    const [isActive, setIsActive] = useState(false);

    //add the active class 
    const toggleActiveClass =()=>{
        setIsActive(!isActive);
    };

    //clean up function to remove the active class
    const removeActive =()=>{
        setIsActive(false);
    }
    return(
        <div className='App'>
            <header className="App-header">
            <nav className={`${styles.navbar}`}>
                {/*logo */}
                <a href="#home" className={`${styles.logo}`}>Dev.</a>

                <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                    <li onClick={removeActive}>
                        <a href="#home" className={`${styles.navLink}`}>Home</a>
                    </li>
                    <li onClick={removeActive}>
                        <a href="#about" className={`${styles.navLink}`}>About</a>
                    </li>
                    <li onClick={removeActive}>
                        <a href="#contact" className={`${styles.navLink}`}>Contact</a>
                    </li>
                    <li onClick={removeActive}>
                        <a href="#portfolio" className={`${styles.navLink}`}>Portfolio</a>
                    </li>

                </ul>

                <div className={`${styles.hamburger} ${isActive ? styles.active: ''}`} onClick={toggleActiveClass}>
                    <span className ={`${styles.bar}`}></span>
                    <span className ={`${styles.bar}`}></span>
                    <span className ={`${styles.bar}`}></span>
                </div>


            </nav>


            </header>

        
           {/* <nav className="navbar">
            <a href="#home" className='navbar-link'>Home</a>
            <a href="#about" className='navbar-link'>About</a>
            <a href="#portfolio" className='navbar-link'>Portfolio</a>
            <a href="#contact" className='navbar-link'>Contact</a>
           </nav> */}
        </div>
    );
}
export default Navbar;