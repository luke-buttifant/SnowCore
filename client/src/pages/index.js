import {React} from "react"
import "../App.css"
import Illustration from '../images/ski-illustration.png';


const Home = () =>{
  return (
    <>
<div className="grid lg:grid-cols-2 grid-cols-1">
<div className="lg:ml-20 ml-5 pt-20">
        <div className="text-secondary">SNOWCORE</div>
        <h1 className="text-4xl lg:text-6xl sm:text-7xl dark:text-white font-semibold">Quality Winter <br className="hidden sm:block"></br> Breaks</h1>
        <h2 className="text-xl lg:text-2xl mt-5 font-light dark:text-white ">We care about your holiday experience! <br></br> Visit our new web page to explore weather <br></br> information for each resort that we offer. </h2>
        <a href="/resorts"><button type="button" className="bg-secondary py-2 px-4 rounded-lg text-xl text-white mt-10 shadow-lg hover:bg-primary animate-pulse">EXPLORE</button></a>
    </div>
    <div>
    </div>
</div>
<div className="grid lg:grid-cols-3 grid-cols-1">
  <div className="hidden lg:grid"></div>
  <div className="mr-48 lg:col-span-2 pt-10 lg:pt-0 mx-auto dark:hidden"><img className="min-w-[140%] lg:min-w-[80%] lg:max-w-[80%] mx-auto lg:mt-20" src={Illustration}></img></div>
</div>
        </>
  );
}
export default Home;