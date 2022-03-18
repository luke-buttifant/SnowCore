import React from "react"
import "../App.css"
import Illustration from '../images/ski-illustration.png';
import Footer from '../components/footer'


const Home = () =>{
    const [data, setData] = React.useState(null);

    React.useEffect(() => {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => setData(data.message));
    }, []);

  return (
    <>
        {/* <div>
    This is from the backend NODE server: <b>{data}</b>
    </div> */}

    <div className="md:ml-40 ml-5 pt-20">
        <div className="text-secondary">SNOWCORE</div>
        <h1 className=" text-6xl sm:text-7xl dark:text-white">Quality Winter <br className="hidden sm:block"></br> Breaks</h1>
        <h2 className="text-2xl mt-5 font-light dark:text-white ">We care about your holiday experience! <br></br> Visit our new web page to explore weather <br></br> information for each resort that we offer. </h2>
        <a href="/resorts"><button type="button" className="bg-secondary py-2 px-4 rounded-lg text-xl text-white mt-10 shadow-lg">EXPLORE</button></a>
    </div>
    {/* <img className=" bottom-0 right-0 md:max-w-[65%] mb-10"src={Illustration}></img> */}
        </>
  );
}
export default Home;