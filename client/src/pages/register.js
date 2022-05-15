import {React, useState, useEffect} from "react"
import "../App.css"
import loginIllustration from '../images/loginIllustration.webp';
import moment from "moment";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Spinner from "../components/spinner"
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import TextField from '@mui/material/TextField';
import ErrorMessage from "../components/errorMessage"

const Register = () =>{

    const [email, setEmail] = useState("")
    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [password,setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const [gender, setGender] = useState("")
    const [dobInput, setDob] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState(null)


    let navigate = useNavigate()

    useEffect(() =>{
          
      const userInfo = localStorage.getItem("jwt");
      if (userInfo){
          navigate("/")
      }
  }, [navigate])

  const submitHandler = async (e) => {
    e.preventDefault();


    if(password !== repeatPassword){
        setMessage('Passwords do not match!')
    }
    else if(!moment(dobInput,"DD/MM/YYYY", true).isValid()){
        setMessage('Date of birth is invalid!')
    }
    else{
        setMessage(null)
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            setLoading(true);
            const dob = moment(dobInput).format("DD/MM/YYYY").toString();
            const {data} = await axios.post(
                "/api/users",
                {first_name, last_name, email, password, gender, dob}
            ).then((response) => {
                localStorage.setItem('jwt', response.data.token);
                navigate("/")
                setLoading(false)
            })
            
            setLoading(false)
            console.log("succesfull registration")
            navigate('/')
        }
        catch (error){
            setError(error.response.data.message)
            setLoading(false)
            console.log("failed")
        }

    }    
}

  return (
    <>
    <div className="flex flex-row">
      <div><img className="min-w-[100%] min-h-screen hidden lg:flex" src={loginIllustration}></img></div>
      <div className="text-white font-sans font-bold min-h-screen mx-auto container bg-white ">
                <div className="grid grid-rows-6 min-h-screen items-center mx-auto">
                
                    <div className="row-span-4 row-start-2 col-auto text-black">
                        <div className="flex"><h1 className="text-2xl lg:text-3xl pr-2 pt-2">Welcome to</h1><h1 className="text-3xl lg:text-3xl bg-primary p-2 rounded-lg text-white">SNOWCORE.</h1></div>
                        <h2 className="text-xl text-gray-500">Register an account</h2>   
                        <form onSubmit={submitHandler}>   
                        <div className="pt-10 pr-10 lg-pr-20 mx-auto">   
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                            <input
                                type="text" 
                                name="firstName" 
                                value={first_name}
                                placeholder="First name..." 
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full py-3 px-3 border hover:border-gray-700 shadow-lg rounded-lg text-base border-gray-400"/>     
                                </div>
                                <div>
                            <input 
                                type="text" 
                                name="lastName" 
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last name..." 
                                className="w-full py-3 px-3 border hover:border-gray-700 rounded-lg shadow-lg  text-base border-gray-400"/>     
                                </div>
                            <div>
                        </div>
                        </div>
                            </div>
                            <div className="pr-10 lg:pr-20 mx-auto">                        
                            <input 
                                type="email" 
                                name="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email..." 
                                className="w-full py-3 px-3 border hover:border-gray-700 border-gray-400  shadow-lg rounded-lg text-base "/>                            
                        </div>
                        <div className="pt-2 pr-10 lg:pr-20">
                            <input 
                                type="password" 
                                name="password" 
                                value={password}
                                placeholder="Password..." 
                                onChange={(e) => setPassword(e.target.value)}
                                className=" w-full py-3 px-3 border  shadow-lg rounded-lg text-base border-gray-400 mx-auto"/>
                        </div>
                        <div className="pt-2 pr-10 lg:pr-20">
                            <input 
                                type="password" 
                                name="RepeatPassword" 
                                placeholder="Repeat Password..." 
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                                className=" w-full py-3 px-3 border  shadow-lg rounded-lg text-base border-gray-400 mx-auto"/>
                        </div>
                        <div className="pt-2 pr-10 lg:pr-20">
                    <LocalizationProvider dateAdapter={AdapterDateFns} className="bg-white">
  <DatePicker
  className="bg-white"
    label="Date of birth"
    value={dobInput || null}
    format="DD-MM-YYYY"
    onChange={(dobInput) => {
      setDob(dobInput);
    }}
    renderInput={(params) => <TextField {...params} fullWidth className="bg-white" />}
    showTodayButton={true}
  />
</LocalizationProvider>
                    </div>
                    <div className="pt-2 text-center">
                    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
      row
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={(e) => setGender(e.target.value)}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
                    </div>
                        <div className="text-sm font-sans font-medium w-full pr-10 lg:pr-20 pt-5 text-center mx-auto">
                        {error &&<ErrorMessage>{error}</ErrorMessage>}
                    {message &&<ErrorMessage>{message}</ErrorMessage>}
                    <button 
                                type="submit"   
                                className="text-center w-full py-4 bg-primary hover:bg-dark-mode  text-white shadow-lg rounded-2xl mx-auto font-bold ">
                                    <div className="flex flex-row items-center">
                                        <div className="mx-auto flex">
                                        <div className="text-center">Register</div>{loading && <Spinner />}
                                        </div>
                                    
                                    </div>
                                   
                            </button>
                            <a href="/login" className="text-sm font-sans font-medium text-gray-500 underline mx-auto text-center">
                        Already have an account? Sign in
                        </a>
                        </div>
                        </form>
                    </div>
                   
    
                </div>         
            </div>
        
    </div>
    
        </>
  );
}
export default Register;