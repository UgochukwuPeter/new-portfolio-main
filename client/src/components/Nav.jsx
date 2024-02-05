import React from 'react'
import { useState } from 'react';
import github from '../img/iconmonstr-github-1.svg';
import facebook from '../img/iconmonstr-facebook-6.svg';
import twitter from '../img/iconmonstr-twitter-1.svg';
import linkedIn from '../img/iconmonstr-linkedin-3.svg';
import styles from './Nav.module.css';
// import './nav.css';

const Nav =()=>{
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
        <div>
           <nav className={`${styles.navbar}`}>
            <ul className={`${styles.navMenu} ${isActive ? styles.active: ''}`}>
                <li onClick={removeActive}><a href="#home" className={`${styles.navLink}`}>Home</a></li>
                <li onClick={removeActive}><a href="#about" className={`${styles.navLink}`}>Skills</a></li>
                <li onClick={removeActive}><a href="#portfolio" className={`${styles.navLink}`}>Portfolio</a></li>
                <li onClick={removeActive}><a href="#contact" className={`${styles.navLink}`}>Contact</a></li>
            </ul>
            
              <div className={`${styles.mobileIcons}`}>
                    <ul className={`${styles.icons}`}>
                        <li><a href="https://www.linkedin.com/in/peter-ugochukwu-5b6336144/" target='_blank'><img src={linkedIn} className={`${styles.img}`} alt="linkedin icon" /></a></li>
                        <li><a href="https://github.com/UgochukwuPeter" target='_blank'><img src={github} alt="github icon" /></a></li>
                        <li><a href="#" target='_blank'><img src={facebook} alt="facebook icon" /></a></li>
                        <li><a href="#" target='_blank'><img src={twitter} alt="twitter icon" /></a></li>

                    </ul>
                </div>
            <div className={`${styles.hamburger} ${isActive ? styles.active: ''}`} onClick={toggleActiveClass}>
                    <span className ={`${styles.bar}`}></span>
                    <span className ={`${styles.bar}`}></span>
                    <span className ={`${styles.bar}`}></span>
                </div>
                
              
            
           </nav>
        </div>
    );
}
export default Nav;