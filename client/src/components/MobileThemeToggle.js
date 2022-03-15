import { React, useRef } from "react";
import sunIcon from '../images/sun-icon.png'
import {BsSun} from 'react-icons/bs'

const MobileToggle = () => {

   function toggleTheme(){
    const lightModeToggle = document.getElementById("lightModeToggle");
    if (localStorage.theme === 'dark'){
        localStorage.theme = 'light'
        window.location.reload(true);

    }
    else if (localStorage.theme === 'light'){
        localStorage.theme = 'dark'
        window.location.reload(true);
    }
   }
    
return(
    <>
    <div className="flex justify-center items-center mt-4">
    <div className="dark:bg-dark-mode dark:text-white bg-sunIcon rounded-full cursor-pointer shadow-lg rounded w-12 mx-auto p-2 bg-white border-primary dark:border-white border rounded-lg shadow-lg hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-dark-mode" onClick={toggleTheme}>
            <BsSun className="mx-auto"/></div>
</div>
</>
);
};

export default MobileToggle;