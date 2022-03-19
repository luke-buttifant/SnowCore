import { AiFillGithub } from "react-icons/ai";

const AboutUsCard = ({ name, gitHubLink, dp, colour}) =>  {


    return(
        <>
        <div className='mx-auto grid grid-rows-2 bg-white dark:bg-dark-mode-secondary rounded-b-lg mt-5'>
                  <div className={colour + " px-16 rounded-t-lg"}><img className="rounded-full w-40 h-40 block mb-10 relative mx-auto mt-2" src={dp} ></img></div>
                  <div className='h-[100%] bg-white dark:bg-dark-mode-secondary min-h-[50%] z-10 w-full'>
                      <div className='grid grid-rows-2'>
                          <div className='mx-auto font-bold text-2xl dark:text-white'>{name}</div>
                          <a className="mx-auto" href={gitHubLink} ><div><AiFillGithub className="dark:text-white" size={40}/></div></a>
                      </div>
                  </div>
              </div>
        </>
    )
}

export default AboutUsCard;
