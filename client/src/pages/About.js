import {React,useEffect, useState} from 'react';
import dp from '../images/dp.png'
import {AiOutlineMail, AiOutlinePhone} from 'react-icons/ai'
import AboutUsCard from '../components/aboutUsCard';
import RahulDp from '../images/rahulDp.jpg'
import MichalDp from '../images/michal-dp.webp'
import IvanDp from '../images/ivan-dp.webp'
import { GoLocation } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const About = () =>{
  let navigate = useNavigate()

  useEffect(() => {
      userAuthenticated();
    }, [navigate]);
   

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
  return (
      <>
      <div className='container'>
          <h1 className='text-3xl font-bold pt-10 mb-2 dark:text-white'>About Us</h1>
          <div className='text-xl font-light dark:text-white'>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of 
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s with the release of 
            Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </div>
          <h1 className='text-3xl font-bold pt-10 dark:text-white'>Creators</h1>
          <div className='container'>
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 '>
            <AboutUsCard dp={dp} name="Luke" gitHubLink={"https://github.com/luke-buttifant"} colour={"bg-secondary"}/>
            <AboutUsCard dp={RahulDp} name="Rahul" gitHubLink={"https://github.com/shrestha-rahul"} colour={"bg-[#1C1C38]"} />
            <AboutUsCard dp={MichalDp} name="Michal" gitHubLink={"https://github.com/Misterius-code"} colour={"bg-[#C6FAD2]"} />
            <AboutUsCard dp={IvanDp} name="Ivan" gitHubLink={"https://github.com/3bilyi81"} colour={"bg-[#C5C7FF]"} />
          </div>

        <div className='container'>
        <div className='grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-dark-mode-secondary mt-10 rounded-lg'>
          <div className='contactForm  p-5 rounded-lg bg-white dark:bg-dark-mode-secondary'>
              <h1 className='mb-2 text-3xl  dark:text-white font-bold'>Contact Us</h1>
              <form action="" method="post">
                <div class="md:flex items-center mt-2 ">
                    <div class="w-full md:w-1/2 flex flex-col">
                        <label class="font-semibold leading-none text-primary dark:text-white">Name</label>
                        <input type="text" class="leading-none text-primary p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 dark:bg-dark-mode bg-gray-100 rounded dark:text-white" />
                    </div>
                    <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                        <label class="font-semibold leading-none text-primary dark:text-white">Phone</label>
                        <input type="email" class="leading-none text-primary p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 dark:bg-dark-mode bg-gray-100 rounded dark:text-white"/>
                    </div>
                </div>
                <div class="md:flex items-center mt-8">
                    <div class="w-full flex flex-col">
                        <label class="font-semibold leading-none text-primary dark:text-white">Subject</label>
                        <input type="text" class="leading-none text-primary p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 dark:bg-dark-mode bg-gray-100 rounded dark:text-white"/>
                    </div>
                    
                </div>
                <div>
                    <div class="w-full flex flex-col mt-8">
                        <label class="font-semibold leading-none text-primary dark:text-white">Message</label>
                        <textarea type="text" class="h-40 text-base leading-none text-primary p-3 focus:outline-none focus:border-blue-700 mt-4 dark:bg-dark-mode bg-gray-100 border-0 rounded dark:text-white"></textarea>
                    </div>
                </div>
                <div class="flex items-center justify-center w-full">
                    <button class="mt-9 font-semibold leading-none text-white py-4 px-10 bg-secondary rounded hover:bg-primary focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none">
                        Send message
                    </button>
                </div>
            </form>

              
          </div>

          <div className='other'>
            <div className='flex flex-col p-10 mt-0 md:mt-12 '>
              <div><h1 className='font-bold text-2xl dark:text-white'>Let's Connect</h1></div>
              <div><h2 className='text-gray-700 dark:text-white'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br></br> 
Lorem Ipsum has been the industry's standard dummy text </h2></div>
              <div className='mt-10 dark:text-white'>
              <div className='flex flex-row '><AiOutlineMail className='m-2' size={30}/><div className="mt-2">info@snowcore.com</div></div>
              <div className='flex flex-row'><AiOutlinePhone className='m-2' size={30}/><div className="mt-2">023 8201 3000</div></div>
              <div className='flex flex-row'><GoLocation className='m-2' size={30}/><div className="mt-2">E Park Terrace, Southampton SO14 0YN</div></div>
              </div>
              </div>
            </div>
          </div>
        </div>
          

          </div>
      </div>
      
      </>
  );
}
export default About;