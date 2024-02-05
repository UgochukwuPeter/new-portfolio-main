import React, { useEffect, useMemo, useState } from 'react';
// import Man from '../img/man.png'
import Logo from '../img/logoimg.png';
import './header.css'
import { ReactTyped } from 'react-typed';
import NewNav from './NewNav';

let timer;
const Header = () => {
    const [counterState, setCounter] = useState(0);
    useEffect(() => {
        clearInterval(timer);
        timer = setInterval( ()=>{
            if(counterState === 20){
            clearInterval(timer)
            return
            }
            setCounter(prev => prev + 1)
            // counter++
        }, 10)
        return () =>clearInterval(timer)
        
        }, [counterState]);
    return (
        <div className='container' id='home'>
            <NewNav/>
            <div className='c-wrapper'>
            <div className='c-right'>
                    <img src={Logo} alt='' />
                    <div className='stats'>
                        <h1>{counterState}+</h1>
                        <p>projects completed</p>
                    </div>
                </div>
                <div className='c-left'>
                    <h2 className='c-left-intro'>Hello, I'm</h2>
                    <h1>
                    <ReactTyped
                    strings={["Ugochukwu Peter", "Website Developer", "React Developer"]}
                    typeSpeed={100}
                    loop
                    backSpeed={20}
                    cursorChar="|"
                    showCursor={true}
                    />
                    </h1>
                    <p className='c-left-desc'>Obviously I'm a JavaScript Developer with over 2 years of experience. Proficient in ReactJS and NodeJS</p>
                    <div className='hire'>
                        <button><a href="#contact">Hire Me</a></button>
                        <a href="./UGOCHUKWU-PETER CV-Updated.pdf" download='UGOCHUKWU-PETER CV-Updated.pdf'>
                        <button>Resume</button>
                        </a>
                        
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Header;