import React from 'react'
import ProgressBar from '@ramonak/react-progress-bar';
import ScrollAnimation from 'react-animate-on-scroll';
import styles from './Progress.module.css';
export const Progress = (props) => {

  return (
    <div className={`${styles.p_width}`}>
    {/* <ScrollAnimation animateIn="fadeIn" animateOut="fadeOut">
    <ProgressBar completed={50} bgColor='red'animateOnRender={true}/>
    </ScrollAnimation> */}
    <ScrollAnimation animateIn='fadeIn' >
    <ProgressBar completed={props.completed} bgColor={props.bgColor} animateOnRender={props.animateOnRender}/>
    </ScrollAnimation>
        
    </div>
  )
}
