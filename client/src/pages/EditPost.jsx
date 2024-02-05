import './editPost.css';
import { imageDb } from '../Firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';
import { toast } from 'react-toastify';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';


const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const EditPost = () => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem('user'));
  const { accessToken } = userData;
  const [post, setPost] = useState(null);
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
        if (item.file) { // Check if file is provided
          const fileName = new Date().getTime() + item.label + item.file.name;
          const imgRef = ref(imageDb, `/items/${fileName}`);
          const fileContent = await readFileAsDataURL(item.file);
          const contentType = fileContent.split(';')[0].split(':')[1];
          const blob = dataURLtoBlob(fileContent, contentType);
          const uploadPromise = uploadBytes(imgRef, blob);
          uploadPromises.push(uploadPromise);
        }
      }
      // Wait for all the promises to resolve
      const uploadSnapshots = await Promise.all(uploadPromises);
  
      for (let i = 0; i < uploadSnapshots.length; i++) {
        const url = await getDownloadURL(uploadSnapshots[i].ref);
        newPostData[items[i].label] = url;
      }
  
      setPostData(newPostData);
      setUploaded(uploadPromises.length);
      setLoading(false);
      toast.success("Images uploaded successfully");
    } catch (error) {
      console.error('Error uploading or getting download URL:', error);
      toast.error("Error uploading images");
      setLoading(false);
    }
  };
  

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
      const response = await axios.put(`http://localhost:5000/api/posts/${postId}`, postData, {
        headers: {
          token: "Bearer " + accessToken
        },
      });

      console.log('Post updated successfully:', response.data);
      setLoading(false);
      toast.success("Post updated successfully");
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
      console.error('Error updating post:', error);
      toast.error("Error updating post");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/find/${postId}`, {
          headers: {
            token: "Bearer " + accessToken
          },
        });
        setPost(response.data);
        // Use either setPost or setPostData here based on your preference
        setPostData(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    fetchPost();
  }, [postId, accessToken]);

  return (
    <div className="newProject">
      <h1>Edit Project</h1>
      <form className="new-project-form">
        <div className="new-project-left">
          <div className="new-project-file">
            <input type="file" name="imgBig" id="imgBig" onChange={e => setImgBig(e.target.files[0])} />
            <input type="file" name="imgThumb1" id="imgThumb1" onChange={e => setImgThumb1(e.target.files[0])} />
            <input type="file" name="imgThumb2" id="imgThumb2" onChange={e => setImgThumb2(e.target.files[0])} />
            <input type="file" name="imgThumb3" id="imgThumb3" onChange={e => setImgThumb3(e.target.files[0])} />
          </div>
          <div className="project-skills">
          <input type="text" name="skill1" placeholder={post ? post.skill1 : ''} onChange={handleChange} value={postData.skill1} />
            <input type="text" name="skill2" placeholder={post ? post.skill2 : ''} onChange={handleChange} value={postData.skill2} />
            <input type="text" name="skill3" placeholder={post ? post.skill3 : ''} onChange={handleChange} value={postData.skill3} />
            <input type="text" name="skill4" placeholder={post ? post.skill4 : ''} onChange={handleChange} value={postData.skill4} />
            <input type="text" name="skill5" placeholder={post ? post.skill5 : ''} onChange={handleChange} value={postData.skill5} />
            <input type="text" name="skill6" placeholder={post ? post.skill6 : ''} onChange={handleChange} value={postData.skill6} />
            <input type="text" name="skill7" placeholder={post ? post.skill7 : ''} onChange={handleChange} value={postData.skill7} />
            <input type="text" name="skill8" placeholder={post ? post.skill8 : ''} onChange={handleChange} value={postData.skill8} />
            <input type="text" name="skill9" placeholder={post ? post.skill9 : ''} onChange={handleChange} value={postData.skill9} />
            <input type="text" name="skill10" placeholder={post ? post.skill10 : ''} onChange={handleChange} value={postData.skill10} />
          </div>
        </div>
        <div className="new-project-right">
          <input type="text" name="pageTitle" onChange={handleChange} value={postData.pageTitle} placeholder={post ? post.pageTitle  : ""} />
          <input type="text" name="pageTeam" onChange={handleChange} value={postData.pageTeam} placeholder={post ? post.pageTeam  : ""} />
          <input type="text" name="pagePurpose" onChange={handleChange} value={postData.pagePurpose} placeholder={post ? post.pagePurpose  : ""} />
          <input type="text" name="pageLink" onChange={handleChange} value={postData.pageLink} placeholder={post ? post.pageLink  : ""} />
          <textarea name="aboutPageDesc" onChange={handleChange} value={postData.aboutPageDesc} id="" cols="30" rows="10" placeholder="About the project">{post ? post.aboutPageDesc :  ''}</textarea>
          <textarea name="roleOnPage" onChange={handleChange} value={postData.roleOnPage} id="" cols="30" rows="10" placeholder="Your Role on the project">{post ? post.roleOnPage :  ''}</textarea>
          
          <button onClick={uploaded === 4 ? handleSubmit : handleUpload} disabled={loading} className="spinner-button">
            {loading && <ClipLoader css={override} size={15} color={'#ffffff'} loading={loading} />} 
            {loading ? 'Uploading...' : uploaded === 4 ? 'Update' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;
