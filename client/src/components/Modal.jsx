import { useEffect, useState } from 'react';
import './modal.css';
import SlideShow from './SlideShow';
import axios from 'axios';


const Modal = ({ isOpen, onClose, selectedItemId }) => {
  const [selectedItemData, setSelectedItemData] = useState(null);
  
  useEffect(() => {
    console.log("Effect triggered with isOpen:", isOpen, "and selectedItemId:", selectedItemId);
    if (isOpen && selectedItemId) {
      const fetchItemData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/posts/find/${selectedItemId}`, {
            headers: {
              // token: "Bearer " + "your_token_here"
            },
          });
          setSelectedItemData(response.data);
        } catch (error) {
          console.error('Error fetching item data:', error);
        }
      };
    
      fetchItemData();
    }
  }, [isOpen, selectedItemId]);
  
  const images =[
    `${selectedItemData?.imgBig}`,
    `${selectedItemData?.imgThumb2}`,
    `${selectedItemData?.imgThumb3}`,
  ]

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
    <div className="modal-content">
      <div className='modal-head'>
        <h1>{selectedItemData?.pageTitle}</h1>
        <i class='bx bx-x' onClick={onClose}></i>
        </div>
      <div className='modal-body'>
        <SlideShow imageUrls={images}/>
        <span className='company-info'>{selectedItemData?.pagePurpose}</span>
        <div className='modal-body-content'>
        <h3>About {selectedItemData?.pageTitle}</h3>
        <p>{selectedItemData?.aboutPageDesc}</p>
        </div>
        <div className='modal-body-content'>
        <h3>What I did?</h3>
        <p>{selectedItemData?.roleOnPage}</p>
        </div>
        <div className='modal-body-content'>
        <h3>Skills Used</h3>
        <span className='skill-used'>{selectedItemData?.skill1}</span>
        <span className='skill-used'>{selectedItemData?.skill2}</span>
        <span className='skill-used'>{selectedItemData?.skill3}</span>
        <span className='skill-used'>{selectedItemData?.skill4}</span>
        <span className='skill-used'>{selectedItemData?.skill5}</span>
        <span className='skill-used'>{selectedItemData?.skill6}</span>
        <span className='skill-used'>{selectedItemData?.skill7}</span>
        <span className='skill-used'>{selectedItemData?.skill8}</span>
        <span className='skill-used'>{selectedItemData?.skill9}</span>
        <span className='skill-used'>{selectedItemData?.skill10}</span>
        </div>
        <div className='modal-body-content'>
        <h3>Project Link</h3>
        <a href={selectedItemData?.pageLink} target="_blank">{selectedItemData?.pageLink}</a>
        </div>

        
      </div>
      
    </div>
  </div>
  )
}

export default Modal;