import { CgProfile } from 'react-icons/cg'
import { AiOutlineSetting } from 'react-icons/ai'
import {FiUsers} from 'react-icons/fi'
import {AiOutlineProfile} from "react-icons/ai"
import { GoSignOut } from 'react-icons/go'
import {BiStats} from 'react-icons/bi'
import dp from '../images/dp.png'
import {React} from 'react'
import Toggle from './ThemeToggle';

const AdminNav = () => {
    return(
        <div className=" ml-2  shadow-2xl  justify-center z-0 flex mb-10 pt-2 pb-2 bg-white dark:bg-dark-mode rounded-lg mt-2">
      <div className="w-full bg-white dark:bg-dark-mode rounded-md">
        <div className="px-6 pt-8">
          <div className="flex items-center justify-between min-w-max">
            <a
              href="#"
              className="w-14 rounded flex min-w-full"
            >
              <h1 className='flex rounded-md text-black dark:text-white text-xl font-bold mx-auto text-center'> Admin Dashboard </h1>
            </a>
          </div>
        </div>
        <div className="px-6 pt-4 min-w-full">
          <ul className="flex flex-col space-y-2 mx-auto text-center min-w-full">
            <li className="relative text-primary dark:text-white hover:text-white focus-within:text-white mx-auto text-center hover:bg-primary px-4 rounded-lg">
              <div
                className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none"
              >
                <BiStats size={30} />

              </div>
              <a
                href="/"
                className="inline-block w-full py-2 pl-14   dark:hover:bg-gray-600 dark:text-white focus:outline-none hover:text-white focus:bg-primary focus:text-white text-primary"
              >Statistics</a
              >
            </li>
            <li className="relative text-primary dark:text-white hover:text-white focus-within:text-white mx-auto text-center hover:bg-primary px-4 rounded-lg">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none p-2">
                    <FiUsers size={30}/>
                  </div>
                  <a href='/users'
                    className="inline-block w-full py-2 pl-14  rounded  focus:outline-none hover:text-white focus:ring-1 focus:ring-gray-500 focus:bg-primary focus:text-white text-primary dark:hover:bg-gray-600 dark:text-white"
                  >Users</a>
            </li>
            <li className="relative text-primary dark:text-white hover:text-white focus-within:text-white mx-auto text-center hover:bg-primary px-4 rounded-lg">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none p-2">
                    <AiOutlineProfile size={30}/>
                  </div>
                  <a href='/users'
                    className="inline-block w-full py-2 pl-14  rounded  focus:outline-none hover:text-white focus:ring-1 focus:ring-gray-500 focus:bg-primary focus:text-white text-primary dark:hover:bg-gray-600 dark:text-white"
                  >Edit Profile</a>
            </li>
          </ul>
        </div>

        </div>
      </div>
    )
}

export default AdminNav;