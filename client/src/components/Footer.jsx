import React from 'react'
import {Link} from  'react-router-dom';
import './footer.css';

const Footer =()=>{
    const date = new Date().getFullYear();
    return(
        <div className='foot-container'>
            <h1>Ugochukwu.</h1>
            <p>Copyright @{date}. Designed by <Link to="/login"  className="link">Ugochukwu Peter</Link></p>
            <div className='social-icons'>
            <a href="https://www.linkedin.com/in/peter-ugochukwu-5b6336144/" target='_blank'><i class='bx bxl-linkedin bx-tada' ></i></a>
            <a href="https://github.com/UgochukwuPeter" target='_blank'><i class='bx bxl-github bx-tada' ></i></a>
        </div>
        </div>
    )
};

export default Footer;