import { React, useRef } from "react";
import {BsSun} from 'react-icons/bs'

function toggleTheme(){
    const lightModeToggle = document.getElementById("lightModeToggle");
    if (localStorage.theme === 'dark'){
        localStorage.theme = 'light'
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('bg-background')
        document.documentElement.classList.remove("bg-dark-mode")

    }
    else{
        localStorage.theme = 'dark'
        document.documentElement.classList.add('dark')
        document.documentElement.classList.add('bg-dark-mode')
        document.documentElement.classList.remove("bg-background")
    }
}

const MobileToggle = () => {
    
return(
    <>
    <div className="flex justify-center items-center mt-4">
    <div className="dark:bg-dark-mode dark:text-white rounded-full cursor-pointer shadow-lg rounded w-12 mx-auto p-2 bg-white border-primary dark:border-white border rounded-lg shadow-lg hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-dark-mode" onClick={toggleTheme}>
            <BsSun className="mx-auto"/></div>
</div>
</>
);
};

export default MobileToggle;