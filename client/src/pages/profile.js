import "../App.css"
import {AiOutlineProfile} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'
import {FiSettings, FiLogOut} from 'react-icons/fi'
import {ImBin} from 'react-icons/im'
import {AiOutlineStar } from 'react-icons/ai'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading"

const Profile = () =>{
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
      userAuthenticated();
    }, [navigate]);

  const [file, setFile] = useState(null)
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();
  const [dob, setDob] = useState();
  const [password, setPassword] = useState();
  

  const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('photo', file);
    formData.append('_id', data._id)
    if(first_name !== undefined){
      formData.append('first_name', first_name)
    }
    if(last_name !== undefined){
      formData.append('last_name', last_name)
    }
    if(email !== undefined){
      formData.append('email', email)
    }
    if(gender !== undefined){
      formData.append('gender', gender)
    }
    if(dob !== undefined){
      formData.append('dob', dob)
    }
    
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      }
    }

   axios.post('/api/users/uploadImage', formData, config).then((response) => {
      console.log(response.data.filename);
      alert("Succesfully uploaded image");
      
    }).catch((err) => {
      console.log('error', err)
    })
    
  }


    


  const onInputChange = (e) => {
    setFile(e.target.files[0])
  }

   

const [data, setData] = useState({})

  const userAuthenticated = async () => {
      var user = await axios.get("/api/users/currentUser", {headers: {
      "x-access-token": localStorage.getItem("jwt")
    }}).then((response) => {
      setData(response.data)
      setIsLoading(false)
      if(response.data.message == "authentication failed"){
        localStorage.removeItem("jwt");
        navigate("/login")
      }
    })
  }
  if(isLoading){ return (
    <ReactLoading type={"spinningBubbles"} color={"#000"} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"/>
   )}
   else return (
      <>
      <form onSubmit={onFormSubmit}>
      <div className="container">
        
          <img className="w-52 h-52 mx-auto rounded-full p-4" src={data.pic}></img>
          <div className="text-center">
          <input type="file" className=" mx-auto text-center w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-primary
      hover:file:bg-violet-100
    " name="photo" onChange={onInputChange}/>
          </div>

         
    <h1 className="text-center text-4xl font-Sora dark:text-white">{data.first_name} {data.last_name}</h1>
    <hr className="w-96 mx-auto mb-8 dark:opacity-25"></hr>
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-dark-mode-secondary rounded-lg shadow-lg mx-auto md:max-w-[70%]">
      <div className="container">
        <div className="grid grid-rows-3 m-10 gap-3 rounded-lg text-center">
          <a href="/profile"><div className="text-2xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><AiOutlineProfile className="mr-2 mt-1 "/> Profile</div></div></a>
          <a href="/changePassword"><div className="text-2xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><RiLockPasswordLine className="mr-2 mt-1"/> Password</div></div></a>
          <a href="/profile"><div className="text-2xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><AiOutlineStar className="mr-2 mt-1"/> My Favourites</div></div></a>
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
      <div className="grid grid-rows-9 gap-2">
      <div><label className="text-gray-500 dark:text-white" htmlFor="name">Fullname</label></div>
      <div className="grid grid-cols-2 dark:text-white">
        <input className="min-w-full dark:bg-dark-mode-secondary   p-2" name="name" defaultValue={data.first_name} type="text" onChange={(e) => setFirstName(e.target.value)}/>
        <input className="min-w-full dark:bg-dark-mode-secondary  mx-2 p-2" name="name" defaultValue={data.last_name} type="text" onChange={(e) => setLastName(e.target.value)}/>
      </div>
      <hr className="dark:opacity-25"></hr>
      <div><label className="text-gray-500 dark:text-white" htmlFor="email">Email Address</label></div>
      <div><input className="min-w-full dark:bg-dark-mode-secondary p-2 dark:text-white" name="email" type="text" defaultValue={data.email} onChange={(e) => setEmail(e.target.value)}/></div>
      <hr className="dark:opacity-25"></hr>
      <div><label className="text-gray-500 dark:text-white" htmlFor="gender">Gender</label></div>
      <div><input className="min-w-full dark:bg-dark-mode-secondary p-2 dark:text-white" name="gender" type="text" defaultValue={data.gender} onChange={(e) => setGender(e.target.value)}/></div>
      <hr className="dark:opacity-25"></hr>
      <div><label className="text-gray-500 dark:text-white" htmlFor="dob">D.O.B</label></div>
      <div><input className="min-w-full dark:bg-dark-mode-secondary p-2 dark:text-white" name="dob" type="text" defaultValue={data.dob} onChange={(e) => setDob(e.target.value)}/></div>
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
export default Profile;