import React,{useState, useEffect} from 'react'
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css'
import NewProject from './pages/NewProject';
import EditPost from './pages/EditPost';
function App() {
const [isLoading, setLoading] = useState(true);

function someRequest(){ //Simulates a request; makes a "promise that will run for 2.5 second
return new Promise(resolve => setTimeout(()=>resolve(), 2500));
}
useEffect( ()=>{
someRequest().then(()=>{
const loaderElement = document.querySelector(".loader-container");
if(loaderElement){
loaderElement.remove();
setLoading(!isLoading);
}
})
});
if(isLoading){
return null;
}
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path="/new" element={<NewProject/>}/>
          <Route path="/edit/:postId" element={<EditPost/>}/>
        </Routes>
      </Router>

     
    </div>
  );
}

export default App;
