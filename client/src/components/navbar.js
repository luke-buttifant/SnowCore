import { CgProfile } from 'react-icons/cg'
import { MdOutlineNavigateBefore, MdOutlineNavigateNext, MdOutlineSpaceDashboard } from 'react-icons/md'
import { AiOutlineSetting, AiOutlineStar } from 'react-icons/ai'
import { GoSignOut } from 'react-icons/go'
import {IoBookOutline, IoPeopleOutline} from 'react-icons/io5'
import dp from '../images/dp.png'
import {React, useEffect, useState} from 'react'
import {useLocation } from "react-router-dom";
import Toggle from './ThemeToggle';
import MobileToggle from './MobileThemeToggle'
import {useNavigate} from 'react-router-dom'
import axios  from 'axios'



function NavBar(){
  let navigate = useNavigate()
  
  useEffect(async () => {
    await userAuthenticated();
  }, []);

const [data, setData] = useState({})

  const userAuthenticated = async () => {
    await axios.get("/api/users/currentUser", {headers: {
      "x-access-token": localStorage.getItem("jwt")
    }}).then((response) => {
      setData(response.data)
    })
  }

  const withouSidebarRoutes = ["/login", "/register"];

  function toggleNav(){
    document.getElementById("topNav").classList.toggle("hidden");
    document.getElementById("bottomNav").classList.toggle("hidden");
  }



  const {pathname} = useLocation();
  if (withouSidebarRoutes.some((item) => pathname.includes(item))) return null;
  if (withouSidebarRoutes.some((item) => pathname.includes(item))) {
    
  }


  function logOut(){
    localStorage.removeItem("jwt");
    navigate('/login');
  }
  
  return(
    <>
    <div id="topNav" className="float-left top-0 left-0 h-screen m-5 shadow-2xl flex justify-center min-h-screen hidden z-10 absolute">
      <div className="w-64 bg-white dark:bg-dark-mode rounded-md">
        <div className="px-6 pt-8">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="w-14 rounded flex "
            >
              <h1 className='flex bg-primary p-2 rounded-md text-white dark:bg-white dark:text-dark-mode text-xl font-bold'> SNOWCORE. </h1>
            </a>
            <button onClick={toggleNav} className="flex items-center justify-center p-0.5 bg-gray-200 rounded-md shadow-md roundedfocus:outline-none focus:ring-1 focus:ring-gray-500 shadow-lg">
              <MdOutlineNavigateBefore size={30} />
            </button>
          </div>
        </div>
        <div className="px-6 pt-4">
          <div className="relative">
          </div>
        </div>
        <div className="px-6 pt-4">
          <ul className="flex flex-col space-y-2">
            <li className="relative text-primary dark:text-white hover:text-white focus-within:text-white">
              <div
                className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
              >
                <MdOutlineSpaceDashboard size={30} className="ml-2" />

              </div>
              <a
                href="/"
                className="inline-block w-full py-2 pl-14 text-m rounded hover:bg-primary dark:hover:bg-gray-600 dark:text-white focus:outline-none hover:text-white focus:bg-primary focus:text-white text-primary"
              >Home</a
              >
            </li>
            <li className="relative text-primary dark:text-white hover:text-white focus-within:text-white">
            <div
                className="relative flex justify-between text-primary dark:text-white dark:text-white hover:text-white"
              >
                <div className="flex items-center w-full flex-row">
                  <div
                    className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none text-primary dark:text-white"
                  >
                    <CgProfile size={30} className="ml-2"/>
                  </div>
                  <a href='/authenticate'
                    className="inline-block w-full py-2 pl-14 text-m rounded hover:bg-primary focus:outline-none hover:text-white focus:ring-1 focus:ring-gray-500 focus:bg-primary focus:text-white text-primary dark:hover:bg-gray-600 dark:text-white"
                  >Profile</a>
                </div>
              </div>
            </li>
            <li className="relative text-primary dark:text-white hover:text-white focus-within:text-white">
              <div
                className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none hover:text-white"
              >
                <AiOutlineStar size={30} className="ml-2"/>
              </div>
              <a
                href="#"
                className="inline-block w-full py-2 pl-14  text-m rounded hover:bg-primary focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-primary focus:text-white dark:hover:bg-gray-600 dark:text-white"
              >Favourites</a
              >
            </li>
            <li className="relative text-primary dark:text-white hover:text-white focus-within:text-white">
              <div
                className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
              >
                <IoBookOutline size={30} className="ml-2"/>
              </div>
              <a
                href="#"
                className="inline-block w-full py-2 pl-14 text-m rounded hover:bg-primary focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-primary focus:text-white dark:hover:bg-gray-600 dark:text-white"
              >Resorts</a
              >
            </li>
            <li className="relative text-primary dark:text-white hover:text-white focus-within:text-white">
              <div
                className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
              >
                < IoPeopleOutline size={30} className="ml-2"/>
              </div>
              <a
                href="#"
                className="inline-block w-full py-2 pl-14 text-m rounded hover:bg-primary focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-primary focus:text-white dark:hover:bg-gray-600 dark:text-white"
              >About Us</a
              >
            </li>
          </ul>
        </div>

        <div className="px-6 pt-8">
          <hr className="border-primary dark:border-white" />
        </div>
        <div className="flex flex-col items-center mt-10 mx-auto">
            <div
              className="w-20 sm:w-32 rounded-full mx-auto "
            >
              <img
                className="rounded-full mx-auto text-center"
                src={data.pic}
                alt=""
              />
            </div>
          <div className="text-center">
              <div className="text-md text-primary text-center mt-2 dark:text-white">{data.first_name + " " + data.last_name}</div>
            </div>
        </div>
        <div className="px-6 pt-4 pb-8">
          <ul>
            <li className="relative text-primary dark:text-white hover:text-white focus-within:text-white">
              <div
                className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
              >
                < AiOutlineSetting size={30} className="ml-2"/>
              </div>
              <a
                href="#"
                className="inline-block w-full py-2 pl-14 text-m rounded hover:bg-primary focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-primary focus:text-white"
              >Settings</a
              >
            </li>
            <li onClick={logOut} className="relative text-primary dark:text-white hover:text-white focus-within:text-white">
            <div
              className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none mt-2">
              <GoSignOut size={30} className="ml-2"/></div>
            <div className="inline-block w-full py-2 pl-14 text-m rounded hover:bg-primary focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-secondary focus:text-white cursor-pointer">Sign Out</div>
          </li>
          </ul>
          {/* LIGHT MODE TOGGLE */}
          <Toggle />

        </div>
      </div>
    </div>


    {/* IN NAV */}
    <div className='hidden md:block z-10'>
    <div id="bottomNav" className="scale-0 md:scale-100 float-left top-0 left-0 h-screen m-5 shadow-2xl flex justify-center min-h-screen  ">
      <div className="w-24 bg-white dark:bg-dark-mode rounded-tl-lg rounded-bl-lg shadow">


        <div className="px-6 pt-8">


          <div className="flex items-center justify-between mb-5 w-14">
            <a
              href="#"
              className="flex "
            >
              <h1 className='flex bg-primary dark:bg-white p-2 rounded-md text-white dark:text-black font-bold text-xl'> SC. </h1>
            </a>
            <button onClick={toggleNav} className="bg-white  rounded-tr-lg rounded-br-lg focus:outline-none  sticky dark:bg-dark-mode dark:text-white">
              <MdOutlineNavigateNext  size={30}/>
            </button>
          </div>

        </div>
        <div className="px-6 pt-4">
          <ul className="flex flex-col space-y-5">
            
          <a href='/'><li className="relative text-primary hover:text-white focus-within:text-white mx-auto rounded-lg p-2 hover:bg-primary dark:text-white">
              <div
              className="flex items-center mx-auto pointer-events-none pl-1">
              <MdOutlineSpaceDashboard size={25}/>
            </div>
            </li>
            </a>

            <a href='/authenticate'><li className=" text-primary hover:text-white focus-within:text-white mx-auto rounded-lg p-2 hover:bg-primary dark:text-white">
              <div
              className="flex items-center pointer-events-none pl-1">
              <CgProfile size={25}/>
            </div>
            </li>
            </a>

            <a href='/favourites'><li className="relative text-primary hover:text-white focus-within:text-white mx-auto rounded-lg p-2 hover:bg-primary dark:text-white">
              <div
              className="flex items-center mx-auto pointer-events-none pl-1">
              <AiOutlineStar size={25}/>
            </div>
            </li></a>

          <a href='/resorts'><li className="relative text-primary hover:text-white focus-within:text-white mx-auto rounded-lg p-2 hover:bg-primary dark:text-white">
              <div
              className="flex items-center mx-auto pointer-events-none pl-1">
              <IoBookOutline size={25}/>
            </div>
            </li></a>

            <a href='/about'><li className="relative text-primary hover:text-white focus-within:text-white mx-auto rounded-lg p-2 hover:bg-primary dark:text-white">
              <div
              className="flex items-center mx-auto pointer-events-none">
              <IoPeopleOutline size={25}/>
            </div>
            </li></a>

          </ul>
        </div>

        <div className="px-6 pt-8">
          <hr className="border-gray-700" />
        </div>
        <div className="px-6 pt-4">

          <ul className="space-y-2">

            <li className="relative text-primary hover:text-white focus-within:text-white mx-auto rounded-lg p-4 hover:bg-primary dark:text-white">
              <div
                className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                < AiOutlineSetting size={25}/>
              </div>
            </li>

            <button type='button' onClick={logOut}><li className="relative text-primary hover:text-white focus-within:text-white mx-auto rounded-lg p-4 hover:bg-primary dark:text-white mt-4">
            <div
              className="absolute inset-y-0 left-0 flex items-center pl-3 mx-auto pointer-events-none">
              <GoSignOut size={25}/>
            </div>
          </li></button>

          </ul>
          <MobileToggle />
        </div>

      </div>
    </div>
    </div>

    {/* MOBILE NAV TOGGLE */}
    <button id='mobileToggle' onClick={toggleNav} className="md:hidden rounded-tr-lg rounded-br-lg focus:outline-none  relative top-4 left-3 z-0 m-2 dark:bg-dark-mode-secondary bg-gray-200 dark:text-white">
              <MdOutlineNavigateNext  size={35}/>
            </button>
  </>

  )
  
}

const NavBarIcon = ({ icon, text }) => (
  <div className='sidebar-icon group'>
    {icon}

    <span className='sidebar-tooltip group-hover:scale-100'>
      {text}
    </span>
  </div>
);

export default NavBar;