import { useState } from 'react';
import './newNav.css';
import { Link } from 'react-router-dom';
const NewNav = () => {
  const[isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  window.onscroll =()=>{
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
  }
  const handleClick = (link) => {
    // Set the activeLink state to the clicked link
    setActiveLink(link);
  };

  return (
    <div className={isScrolled ? 'newNav scrolled':'newNav'}>
      <div className='newNav-wrapper'>
      <span><Link className='link' to="/">Ugochukwu.</Link></span>
        <nav>
        <ul>
      <li>
        <a
          className={activeLink === 'Home' ? 'active' : ''}
          onClick={() => handleClick('Home')}
          href="#home"
        >
          Home
        </a>
      </li>
      <li>
        <a
          className={activeLink === 'Services' ? 'active' : ''}
          onClick={() => handleClick('Services')}
          href="#services"
        >
          Services
        </a>
      </li>
      <li>
        <a
          className={activeLink === 'Projects' ? 'active' : ''}
          onClick={() => handleClick('Projects')}
          href="#projects"
        >
          Projects
        </a>
      </li>
      <li>
        <a
          className={activeLink === 'Contact' ? 'active' : ''}
          onClick={() => handleClick('Contact')}
          href="#contact"
        >
          Contact
        </a>
      </li>
    </ul>
        <div className='social-icons'>
            <a href="https://www.linkedin.com/in/peter-ugochukwu-5b6336144/" target='_blank'><i class='bx bxl-linkedin bx-tada' ></i></a>
            <a href="https://github.com/UgochukwuPeter" target='_blank'><i class='bx bxl-github bx-tada' ></i></a>
        </div>
        </nav>
      </div>
        
    </div>
  )
}

export default NewNav