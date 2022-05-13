import "../App.css"
import {AiOutlineProfile} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'
import {FiSettings, FiLogOut} from 'react-icons/fi'
import {ImBin} from 'react-icons/im'
import {AiOutlineStar } from 'react-icons/ai'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Password = () =>{
  let navigate = useNavigate()

  useEffect(() => {
      userAuthenticated();
    }, [navigate]);

  const [newPassword, setNewPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if(newPassword != repeatPassword){
      setErrorOpen(true)
      return
    }
    else{
      await axios.post('/api/users/updatePassword', {id: data._id, password: newPassword}).then((response) => {
         console.log(response)
         setOpen(true);
       }).catch((err) => {
         console.log('error', err)
       })
    }

  }


  
    



   

const [data, setData] = useState({})

  const userAuthenticated = async () => {
      var user = await axios.get("/api/users/currentUser", {headers: {
      "x-access-token": localStorage.getItem("jwt")
    }}).then((response) => {
      setData(response.data)
      if(response.data.message == "authentication failed"){
        localStorage.removeItem("jwt");
        navigate("/login")
      }
    })
  }

  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false)

  const handleClose = () => {
    setOpen(false);
  };

  const errorHandleClose = () => {
    setErrorOpen(false);
  };


  return (
      <>

<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    Password Succesfully Changed!
  </Alert>
</Snackbar>
<Snackbar open={errorOpen} autoHideDuration={6000} onClose={errorHandleClose}>
  <Alert onClose={errorHandleClose} severity="error" sx={{ width: '100%' }}>
   Passwords Must Match!
  </Alert>
</Snackbar>

      <form onSubmit={onFormSubmit}>
      <div className="container">
        
          <img className="w-52 h-52 mx-auto rounded-full p-4" src={data.pic}></img>

         
    <h1 className="text-center text-4xl font-Sora dark:text-white">{data.first_name} {data.last_name}</h1>
    <hr className="w-96 mx-auto mb-8 dark:opacity-25"></hr>
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-dark-mode-secondary rounded-lg shadow-lg mx-auto md:max-w-[70%] pb-14">
      <div className="container">
        <div className="grid grid-rows-3 m-10 gap-3 rounded-lg text-center">
          <a href="/profile"><div className="text-2xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><AiOutlineProfile className="mr-2 mt-1 "/> Profile</div></div></a>
          <a href="/changePassword"><div className="text-2xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><RiLockPasswordLine className="mr-2 mt-1"/> Password</div></div></a>
          <a href="/favourites"><div className="text-2xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><AiOutlineStar className="mr-2 mt-1"/> My Favourites</div></div></a>
        </div>
        <hr className="dark:opacity-25"></hr>
      <div className="grid grid-rows-3 mt-4 mr-10 ml-10">
      <a href="/profile"><div className="text-xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><FiSettings className="mr-2 mt-1"/> Settings</div></div></a>
          <a href="/profile"><div className="text-xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><FiLogOut className="mr-2 mt-1"/> Sign Out</div></div></a>
          <a href="/profile"><div className="text-xl text-primary hover:bg-red-500 hover:text-white p-2  rounded-lg"><div className="flex dark:text-red-500 dark:hover:text-white dark:hover:text-dark-mode"><ImBin className="mr-2 mt-1"/> Delete Account</div></div></a>
      </div>
      </div>
    <div className="container">
      <h1 className="text-center text-3xl text-gray-600 dark:text-white font-bold m-5">Edit Profile</h1>
      <div className="flex flex-col gap-2 mt-10">
      <div><label className="text-gray-500 dark:text-white" htmlFor="password">New Password</label></div>
      <div><input className="min-w-full dark:bg-dark-mode-secondary p-2 dark:text-white" name="newPassword" type="password" placeholder="password" onChange={(e) => setNewPassword(e.target.value)}/></div>
      <hr className="dark:opacity-25"></hr>
      <div><label className="text-gray-500 dark:text-white" htmlFor="newPassword">Repeat Password</label></div>
      <div><input className="min-w-full dark:bg-dark-mode-secondary p-2 dark:text-white" name="repeatPassword" type="password" placeholder="password" onChange={(e) => setRepeatPassword(e.target.value)}/></div>
      <hr className="dark:opacity-25"></hr>
      <div className="mx-auto"><button type="submit" className="bg-primary dark:bg-green-200 hover:bg-secondary dark:hover:bg-white p-4 text-lg lg:text-2xl w-48 lg:pl-10 lg:pr-10 lg:min-w-full rounded-lg  m-5 text-white dark:text-black font-bold">Update</button></div>
      </div>
      

    
     
    </div>
    </div>

      </div>
      </form>
    </>
  );
}
export default Password;