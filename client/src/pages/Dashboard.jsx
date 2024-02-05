import './dashboard.css';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 5 },
  {
    field: 'imgBig', headerName: 'Avatar_1', width: 5,
    renderCell: (params)=>{
      return <img  className='avater-img' src={params.row.imgBig || "./noavatar.png" } alt="" />
    }
  },
  {
    field: 'imgThumb1', headerName: 'Avatar_2', width: 5,
    renderCell: (params)=>{
      return <img  className='avater-img' src={params.row.imgThumb1 || "./noavatar.png" } alt="" />
    }
  },
  {
    field: 'imgThumb2', headerName: 'Avatar_3', width: 5,
    renderCell: (params)=>{
      return <img  className='avater-img' src={params.row.imgThumb2 || "./noavatar.png" } alt="" />
    }
  },
  {
    field: 'imgThumb3', headerName: 'Avatar_4', width: 5,
    renderCell: (params)=>{
      return <img  className='avater-img' src={params.row.imgThumb3 || "./noavatar.png" } alt="" />
    }
  },
  {
    field: 'pageTitle',
    type: 'string',
    headerName: 'Title',
    width: 30,
  },
  {
    field: 'pageTeam',
    type: 'string',
    headerName: 'Page Team',
    width: 30,
  },
  {
    field: 'pagePurpose',
    type: 'string',
    headerName: 'Page Purpose',
    width: 30,
  },
  {
    field: 'aboutPageDesc',
    type: 'string',
    headerName: 'About Page Desc',
    width: 30,
  },
  {
    field: 'roleOnPage',
    type: 'string',
    headerName: 'Role on Page',
    width: 30,
  },
  {
    field: 'skill1',
    type: 'string',
    headerName: 'Skills',
    width: 10,
  },
  {
    field: 'skill2',
    type: 'string',
    headerName: 'Skills',
    width: 10,
  },
  {
    field:'skill3',
    type: 'string',
    headerName: 'Skills',
    width: 10,
  },
  {
    field: 'skill4',
    type: 'string',
    headerName: 'Skills',
    width: 10,
  },
  {
    field: 'skill5',
    type: 'string',
    headerName: 'Skills',
    width: 10,
  },
  {
    field: 'skill6',
    type: 'string',
    headerName: 'Skills',
    width: 10,
  },
  {
    field: 'skill7',
    type: 'string',
    headerName: 'Skills',
    width: 5,
  },
  {
    field: 'skill8',
    type: 'string',
    headerName: 'Skills',
    width: 5,
  },
  {
    field: 'skill9',
    type: 'string',
    headerName: 'Skills',
    width: 5,
  },
  {
    field: 'skill9',
    type: 'string',
    headerName: 'Skills',
    width: 5,
  },
  {
    field: 'skill10',
    type: 'string',
    headerName: 'Skills',
    width: 5,
  },
  {
    field: 'pageLink',
    type: 'string',
    headerName: 'Page Link',
    width: 10,
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 100,
    renderCell: (params) => {
      return (
        <div className="action">
          <Link to={`/edit/${params.row._id}`} className="link">
            <img  className='actionImg' src="./view.svg" alt="" />
          </Link>
          <div className="delete" onClick={() => handleDelete(params.row._id)}>
            <img  className='actionImg' src="./delete.svg" alt="" />
          </div>
        </div>
      );
    },
  }
];
const userData = JSON.parse(localStorage.getItem('user')) || {};
const { accessToken } = userData;

const handleDelete = async(postId) => {
  // Delete the item
  try{
    const response = await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
      headers: {
        token: "Bearer " + accessToken
      },
    });
    if (response.status === 200) {
      console.log('Item deleted successfully');
      toast.success("Item deleted successfully");
    } else {
      console.error('Failed to delete item:', response.statusText);
      toast.error("Failed to delete item");
    }
  }catch(error){
    console.log("Error deleting item:",error.message);
  }
};
const Dashboard = () => {
  const[rows, setRows] =  useState([]);
  const navigate = useNavigate();

  const signout =()=>{
    localStorage.removeItem('user');
    navigate('/');
    return toast.success("Logout successful");
  }
  useEffect(()=>{
    const fetchPosts = async ()=>{
      try{
        const  response = await axios.get("http://localhost:5000/api/posts/",{
          headers:{
            //token;
          },
        });
        setRows(response.data);
      }catch(error){
        console.error("Error fectching posts:",error)
      }
    };
    fetchPosts();
  },[]);
  return (
    <div className='dashboard'>
      <div className='admin-title'>
        <div className='admin-title-heading'>
        <h1>Admin Panel</h1>
        <p>Create and Edit your Portfolio</p>
        </div>
        <span onClick={signout} className='logout'>Logout</span>
      </div>
      <div>
        <Link className='link' to='/new'><button>Create New Project</button></Link>
      </div>
      <div>
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        slots={{toolbar: GridToolbar}}
        slotProps={{
          toolbar:{
            showQuickFilter: true,
            quickFilterProps:{debounceMs: 500}
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
      />
      </Box>
      </div>
    </div>
  )
}

export default Dashboard