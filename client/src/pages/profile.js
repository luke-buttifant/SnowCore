import "../App.css"
import dp from "../images/dp.png";
import {AiOutlineProfile} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'
import {FiSettings, FiLogOut} from 'react-icons/fi'
import {ImBin} from 'react-icons/im'
import {AiOutlineStar } from 'react-icons/ai'
const Profile = () =>{
 

	
  return (
      <>
      <div className="container">
          <img className="w-52 mx-auto rounded-full p-4" src={dp}></img>
        
    <h1 className="text-center text-4xl font-Sora dark:text-white"> Luke Buttifant</h1>
    <hr className="w-96 mx-auto mb-8 dark:opacity-25"></hr>
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-dark-mode-secondary rounded-lg shadow-lg mx-auto md:max-w-[70%]">
      <div className="container">
        <div className="grid grid-rows-3 m-10 gap-3 rounded-lg text-center">
          <a href="/profile"><div className="text-2xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><AiOutlineProfile className="mr-2 mt-1 "/> Profile</div></div></a>
          <a href="/profile"><div className="text-2xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><RiLockPasswordLine className="mr-2 mt-1"/> Password</div></div></a>
          <a href="/profile"><div className="text-2xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><AiOutlineStar className="mr-2 mt-1"/> My Favourites</div></div></a>
        </div>
        <hr className="dark:opacity-25"></hr>
      <div className="grid grid-rows-3 mt-4 mr-10 ml-10">
      <a href="/profile"><div className="text-xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><FiSettings className="mr-2 mt-1"/> Settings</div></div></a>
          <a href="/profile"><div className="text-xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-white dark:hover:text-dark-mode"><FiLogOut className="mr-2 mt-1"/> Sign Out</div></div></a>
          <a href="/profile"><div className="text-xl text-primary hover:bg-gray-200 p-2 rounded-lg"><div className="flex dark:text-red-500 dark:hover:text-dark-mode"><ImBin className="mr-2 mt-1"/> Delete Account</div></div></a>
      </div>
      </div>
    <div className="container">
      <h1 className="text-center text-3xl text-gray-600 dark:text-white font-bold m-5">Edit Profile</h1>
      <div className="grid grid-rows-9 gap-2">
      <div><label className="text-gray-500 dark:text-white" htmlFor="name">Username</label></div>
      <div><input className="min-w-full dark:bg-dark-mode-secondary" name="name" type="text" placeholder="Luke Buttifant"/></div>
      <hr className="dark:opacity-25"></hr>
      <div><label className="text-gray-500 dark:text-white" htmlFor="email">Email Address</label></div>
      <div><input className="min-w-full dark:bg-dark-mode-secondary" name="email" type="text" placeholder="Luke123@gmail.com"/></div>
      <hr className="dark:opacity-25"></hr>
      <div><label className="text-gray-500 dark:text-white" htmlFor="gender">Gender</label></div>
      <div><input className="min-w-full dark:bg-dark-mode-secondary" name="gender" type="text" placeholder="Male"/></div>
      <hr className="dark:opacity-25"></hr>
      <div><label className="text-gray-500 dark:text-white" htmlFor="dob">D.O.B</label></div>
      <div><input className="min-w-full dark:bg-dark-mode-secondary" name="dob" type="text" placeholder="06.07.2000"/></div>
      <hr className="dark:opacity-25"></hr>
      <div className="mx-auto"><button className="bg-secondary dark:bg-green-200 p-4 text-lg lg:text-2xl w-48 lg:pl-10 lg:pr-10 lg:min-w-full rounded-lg  m-5 text-white dark:text-black font-bold" type="button">Update</button></div>
      </div>

     
    </div>
    </div>

      </div>
    
    </>
  );
}
export default Profile;