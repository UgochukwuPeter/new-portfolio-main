import React from 'react'
import ManLaptop from '../img/man1.jpg'
import './about.css';
import { Progress } from './Progress';



const About = () => {
    return (
        <div className='a-container' id='about'>
            <h1 className='about-header'>Skills</h1>
            {/* <div className='a-container-wrapper'>
                <div className='a-left'>
                <div className='a-img-bk'></div>
                <img src={ManLaptop} alt=''/>
                </div>
                <div className='a-right'>
                    <h2>About Me</h2>
                    <p className='a-para'>I'm a front-end web developer with expertise in HTML, CSS, Bootstrap, jQuery, and React JS.</p>
                    <p className="a-desc"> I am also proficient in using virtual control tools like Git and GitHub. As a front-end developer, I specialize in designing and developing the visual elements of websites and web applications, such as the layout, navigation, and user interface. My skills in these technologies enables me to create responsive and interactive web interfaces that provides a great user experience for visitors to your websites. Additionally, my familiarity with Git and GitHub allows me to efficiently manage version control and collaborate with other developers on projects.</p>
                </div>
            </div> */}
            <div className='a-wrapper'>
            <p className='a-wrapper-title'>HTML</p>
            <Progress completed={95} bgColor='#2f7693'animateOnRender={true} className="p_width"/>
            </div>
            <div className='a-wrapper'>
            <p className='a-wrapper-title'>CSS</p>
            <Progress completed={80} bgColor='#2f7693'animateOnRender={true}/>
            </div>
            <div className='a-wrapper'>
            <p className='a-wrapper-title'>JavaScript</p>
            <Progress completed={70} bgColor='#2f7693'animateOnRender={true}/>
            </div>
            <div className='a-wrapper'>
            <p className='a-wrapper-title'>Bootstrap</p>
            <Progress completed={80} bgColor='#2f7693'animateOnRender={true}/>
            </div>
            <div className='a-wrapper'>
            <p className='a-wrapper-title'>JQuery</p>
            <Progress completed={50} bgColor='#2f7693'animateOnRender={true}/>
            </div>
            <div className='a-wrapper'>
            <p className='a-wrapper-title'>React</p>
            <Progress completed={65} bgColor='#2f7693'animateOnRender={true}/>
            </div>
            <div className='a-wrapper'>
            <p className='a-wrapper-title'>TypeScript</p>
            <Progress completed={50} bgColor='#2f7693'animateOnRender={true}/>
            </div>
            <div className='a-wrapper'>
            <p className='a-wrapper-title'>NodeJS</p>
            <Progress completed={50} bgColor='#2f7693'animateOnRender={true}/>
            </div>
            <div className='a-wrapper'>
            <p className='a-wrapper-title'>MongoDB</p>
            <Progress completed={50} bgColor='#2f7693'animateOnRender={true}/>
            </div>
            
        </div>
    )
};

export default About;