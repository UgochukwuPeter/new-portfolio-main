import React from 'react'
import ProjectContainer from './ProjectContainer';
import './projects.css';

const Projects =()=>{
    return(

        <div className='p-container' id='projects'>
            <div className='p-wrapper'>
                <h1 className='p-title'>My Work & Projects</h1>
                <p className="p-desc">Explore My Works and Projects, Where Every Line of Code Tells a Unique Story of Innovation.</p>
                <div className="p-content">
                <ProjectContainer/>
                </div>

                
            </div>
        </div>
    )
};

export default Projects;