import PisteMap from '../images/piste-map.jpeg'
import {ImCross} from 'react-icons/im'
import { BsDownload } from 'react-icons/bs'

const PopupMap = () => {
        return(
            <>
        {/* POPUP MAP */}
       <div id='map-popup' className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[80%] hidden">
       <img src={PisteMap} alt="piste map" className="object-cover w-full h-full rounded-lg border-black border shadow-lg border-2" />
       <ImCross id="exit-map" size={35} className="absolute w-10 rounded m-2 p-2.5 top-0 left-0 bg-white text-black dark:bg-black dark:text-white  text-xs text-center leading-4 cursor-pointer" />
       <a href={PisteMap} download><BsDownload size={35} id="downloadButton" className="absolute w-10 rounded m-2 p-2.5 top-0 right-0 bg-white text-black dark:bg-black dark:text-white  text-xs text-center leading-4" /></a>
     </div>
     </>
        )
    }

export default PopupMap;
