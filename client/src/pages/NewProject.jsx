import { useState } from "react";
import "./newProject.css";
import { imageDb } from '../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';
import { toast } from 'react-toastify';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const NewProject = () => {
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));
  const { accessToken } = userData;
  const [imgBig, setImgBig] = useState(null);
  const [imgThumb1, setImgThumb1] = useState(null);
  const [imgThumb2, setImgThumb2] = useState(null);
  const [imgThumb3, setImgThumb3] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [postData, setPostData] = useState({
    pageTitle: '',
    pageTeam: '',
    pagePurpose: '',
    pageLink: '',
    aboutPageDesc: '',
    roleOnPage: '',
    skill1: '',
    skill2: '',
    skill3: '',
    skill4: '',
    skill5: '',
    skill6: '',
    skill7: '',
    skill8: '',
    skill9: '',
    skill10: '',
  });

  const upload = async (items) => {
    try {
      setLoading(true);
      const newPostData = { ...postData };
      const uploadPromises = [];
  
      for (const [index, item] of items.entries()) {
        const fileName = new Date().getTime() + item.label + item.file.name;
        const imgRef = ref(imageDb, `/items/${fileName}`);
        // Read the file content
        const fileContent = await readFileAsDataURL(item.file);
        
        // Extract the content type from the data URL
        const contentType = fileContent.split(';')[0].split(':')[1];
  
        // Create a Blob with the file content and content type
        const blob = dataURLtoBlob(fileContent, contentType);
  
        // Upload the blob to Firebase Storage
        const uploadPromise = uploadBytes(imgRef, blob);
        uploadPromises.push(uploadPromise);
      }
  
      // Wait for all the promises to resolve
      const uploadSnapshots = await Promise.all(uploadPromises);
  
      for (let i = 0; i < uploadSnapshots.length; i++) {
        const url = await getDownloadURL(uploadSnapshots[i].ref);
        newPostData[items[i].label] = url;
      }
  
      setPostData(newPostData);
      setUploaded(items.length);
      setLoading(false);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error('Error uploading or getting download URL:', error);
      toast.error("Error uploading images");
      setLoading(false);
    }
  };
  
  // Helper function to convert data URL to Blob
  function dataURLtoBlob(dataURL, contentType) {
    const arr = dataURL.split(',');
    const byteString = atob(arr[1]);
    let buffer = new ArrayBuffer(byteString.length);
    let view = new Uint8Array(buffer);
  
    for (let i = 0; i < byteString.length; i++) {
      view[i] = byteString.charCodeAt(i);
    }
  
    return new Blob([buffer], { type: contentType });
  }
  
  // Helper function to read file as data URL
  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        resolve(reader.result);
      };
  
      reader.onerror = reject;
  
      reader.readAsDataURL(file);
    });
  }
  

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { name: "imgBig", label: "imgBig", file: imgBig },
      { name: "imgThumb1", label: "imgThumb1", file: imgThumb1 },
      { name: "imgThumb2", label: "imgThumb2", file: imgThumb2 },
      { name: "imgThumb3", label: "imgThumb3", file: imgThumb3 },
    ]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/posts/', postData, {
        headers: {
          token: "Bearer " + accessToken
        },
      });

      console.log('Post created successfully:', response.data);
      setLoading(false);
      toast.success("Post created successfully");
      // Reset state or clear the form after successful submission
      setImgBig(null);
      setImgThumb1(null);
      setImgThumb2(null);
      setImgThumb3(null);
      setPostData({
        pageTitle: '',
        pageTeam: '',
        pagePurpose: '',
        pageLink: '',
        aboutPageDesc: '',
        roleOnPage: '',
        skill1: '',
        skill2: '',
        skill3: '',
        skill4: '',
        skill5: '',
        skill6: '',
        skill7: '',
        skill8: '',
        skill9: '',
        skill10: '',
      });
      setUploaded(0);
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error("Error creating post");
      setLoading(false);
    }
  };

  return (
    <div className="newProject">
      <h1>New Project</h1>
      <form className="new-project-form">
        <div className="new-project-left">
          <div className="new-project-file">
            <input type="file" name="imgBig" id="imgBig" onChange={e => setImgBig(e.target.files[0])} />
            <input type="file" name="imgThumb1" id="imgThumb1" onChange={e => setImgThumb1(e.target.files[0])} />
            <input type="file" name="imgThumb2" id="imgThumb2" onChange={e => setImgThumb2(e.target.files[0])} />
            <input type="file" name="imgThumb3" id="imgThumb3" onChange={e => setImgThumb3(e.target.files[0])} />
          </div>
          <div className="project-skills">
            <input type="text" name="skill1" placeholder="skills" onChange={handleChange} value={postData.skill1} />
            <input type="text" name="skill2" placeholder="skills" onChange={handleChange} value={postData.skill2} />
            <input type="text" name="skill3" placeholder="skills" onChange={handleChange} value={postData.skill3} />
            <input type="text" name="skill4" placeholder="skills" onChange={handleChange} value={postData.skill4} />
            <input type="text" name="skill5" placeholder="skills" onChange={handleChange} value={postData.skill5} />
            <input type="text" name="skill6" placeholder="skills" onChange={handleChange} value={postData.skill6} />
            <input type="text" name="skill7" placeholder="skills" onChange={handleChange} value={postData.skill7} />
            <input type="text" name="skill8" placeholder="skills" onChange={handleChange} value={postData.skill8} />
            <input type="text" name="skill9" placeholder="skills" onChange={handleChange} value={postData.skill9} />
            <input type="text" name="skill10" placeholder="skills" onChange={handleChange} value={postData.skill10} />
          </div>
        </div>
        <div className="new-project-right">
          <input type="text" name="pageTitle" onChange={handleChange} value={postData.pageTitle} placeholder="Project Title" />
          <input type="text" name="pageTeam" onChange={handleChange} value={postData.pageTeam} placeholder="Project company" />
          <input type="text" name="pagePurpose" onChange={handleChange} value={postData.pagePurpose} placeholder="Project purpose" />
          <input type="text" name="pageLink" onChange={handleChange} value={postData.pageLink} placeholder="Project Link" />
          <textarea name="aboutPageDesc" onChange={handleChange} value={postData.aboutPageDesc} id="" cols="30" rows="10" placeholder="About the project"></textarea>
          <textarea name="roleOnPage" onChange={handleChange} value={postData.roleOnPage} id="" cols="30" rows="10" placeholder="Your Role on the project"></textarea>
          
          <button onClick={uploaded === 4 ? handleSubmit : handleUpload} disabled={loading} className="spinner-button">
            {loading && <ClipLoader css={override} size={15} color={'#ffffff'} loading={loading} />} 
            {loading ? 'Uploading...' : uploaded === 4 ? 'Create' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewProject;