import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './projectContainer.css';
import dataItem from '../dataItem.json';
import Modal from './Modal';

const ProjectContainer =()=>{
    const [isModalOpen, setModalOpen] = useState(false);
    const[content, setContent] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleOpenModal = (itemId) => {
        setModalOpen(true);
        setSelectedItemId(itemId);
      };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts', {
          headers: {
            // If you have authentication, include the token here
            // token: "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTZiMDBhZTg1NzA3ZmEzNGU3NzUxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNDM3MzIzNCwiZXhwIjoxNzA2OTY1MjM0fQ.0iO0ldQc9UTu6tYqF7Nzzm8PhhZUe6sX_BrwaxGA-e8"
          },
        });
        setContent(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount
    console.log(dataItem);
    return(
        <div className='pc-container'>
        {
            content.map((item) =>(
                <div className='pc-left' key={item._id} onClick={() => handleOpenModal(item._id)}>
                    {/* <div className='pc-title'>
                    <h2 className='pc-left-desc'>{item.desc}</h2>
                    <p className='pc-stack'>{item.stack}</p>
                    </div> */}
                <img className="pc-img" src ={item.imgBig} alt=''/>
                <div className='cover'>
                     <p>{item.pageTitle}</p>
                    <span>{item.pageTeam}</span> 
                </div>
                {/* <div className='pc-link'>
                <a className="pc-left-a" href={item.url} target='blank'>Visit Page</a>
                </div> */}
                </div>
            ))
        }
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}  selectedItemId={selectedItemId} />
        </div>
    )
};
export default ProjectContainer;