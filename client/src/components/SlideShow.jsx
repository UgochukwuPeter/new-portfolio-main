import { useState } from 'react';
import './slideshow.css';
import { useEffect } from 'react';


const SlideShow = ({ imageUrls }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
    };
  
    useEffect(() => {
        const intervalId = setInterval(() => {
          nextSlide();
        }, 3000); // Change the interval duration as needed
    
        return () => clearInterval(intervalId);
      }, [currentIndex]);

  return (
     <div className="slideshow-images-container">
      <i class='bx bx-chevron-right slide-icon' onClick={nextSlide}></i>
      <i class='bx bx-chevron-left slide-icon'  onClick={prevSlide}></i>
      <img className="fade" src={imageUrls[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      
    </div>
  )
}

export default SlideShow