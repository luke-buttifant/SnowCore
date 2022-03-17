const Footer = () => {

    return(

        <>
        <footer className="flex justify-center px-4 text-primary bg-white dark:bg-dark-mode-secondary dark:text-white mt-10">
        <div className="container py-6">
            <h1 className="text-center text-lg font-bold lg:text-2xl">
                Sign up to our newsletter and never miss <br /> out on new deals, weather updates, and more.
            </h1>

            <div className="flex justify-center mt-6">
                <div className="bg-white rounded-lg">
                    <div className="flex flex-wrap justify-between md:flex-row dark:bg-dark-mode-secondary ">
                        <input type="email" className="m-1 p-2 appearance-none text-primary dark:bg-dark-mode-secondary text-sm focus:outline-none" placeholder="Enter your email" />
                        <button className="w-full m-1 p-2 text-sm bg-primary dark:bg-dark-mode text-white  rounded-lg font-semibold uppercase lg:w-auto">subscribe</button>
                    </div>
                </div>
            </div>

            <hr className="h-px mt-6 bg-gray-700 border-none" />

            <div className="flex flex-col items-center justify-between mt-6 md:flex-row">
                <div>
                    <a href="#" className="text-xl font-bold text-white bg-primary dark:bg-white dark:text-primary p-2 rounded-lg ">SNOWCORE.</a>
                </div>
                <div className="flex mt-4 md:m-0">
                    <div className="-mx-4">
                      <a href="#" className="px-4 text-sm">About</a>
                      <a href="https://github.com/luke-buttifant/SnowCore" target={"_blank"}  className="px-4 text-sm">GitHub</a>
                      <a href="#" className="px-4 text-sm">Contact</a>
                  	</div>
                </div>
            </div>
        </div>
    </footer>
    </>
    )
}

export default Footer;
