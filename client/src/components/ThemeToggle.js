import { useRef } from "react";

const Toggle = () => {

   function toggleTheme(){
    const lightModeToggle = document.getElementById("lightModeToggle");
    if (localStorage.theme === 'dark'){
        localStorage.theme = 'light'
        document.documentElement.classList.add('dark')
        document.documentElement.classList.add("bg-dark-mode")
        lightModeToggle.classList.add('ml-16');
    }
    else if (localStorage.theme === 'light'){
        localStorage.theme = 'dark'
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add("bg-white")
        lightModeToggle.classList.remove('ml-16');
    }
   }
    
return(
    <>
    <div className="flex justify-center items-center mt-4">

    <span className="">
        <svg className="h-6 w-6 text-primary dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    </span>
    <div className="w-40 h-7 flex items-center bg-gray-300 dark:bg-black rounded-full mx-3 px-1 bg-primary cursor-pointer" onClick={toggleTheme}>
        <div  id='lightModeToggle' className={localStorage.theme === 'dark' ? 'bg-dark-mode w-16 h-5 rounded-full shadow-md transform ml-16 hover:bg-primary' : 'bg-white w-16 h-5 rounded-full shadow-md transform animate-pulse'}></div>
    </div>
    <span className="">
        <svg className="h-6 w-6 text-primary dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    </span>
</div>
</>
);
};

export default Toggle;