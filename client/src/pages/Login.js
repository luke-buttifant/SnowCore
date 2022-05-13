import { React, useState, useEffect } from "react";
import "../App.css";
import loginIllustration from "../images/loginIllustration.webp";
import axios from "axios";
import Spinner from "../components/spinner";
import ErrorMessage from "../components/errorMessage";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("jwt");
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    setLoading(true);
    try {
      await axios
        .post(
          "api/users/login",
          {
            email,
            password,
          },
          config
        )
        .then((response) => {
          localStorage.setItem("jwt", response.data.token);
          setLoading(false);
          navigate("/");
        });
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-row">
        <div>
          <img
            className="min-w-[100%] min-h-screen hidden lg:flex"
            src={loginIllustration}
          ></img>
        </div>
        <div className="text-white font-sans font-bold min-h-screen mx-auto container bg-white ">
          <div className="grid grid-rows-6 min-h-screen items-center mx-auto">
            <div className="row-span-4 row-start-2 col-auto text-black">
              <div className="flex">
                <h1 className="text-2xl lg:text-3xl pr-2 pt-2">Welcome to</h1>
                <h1 className="text-3xl lg:text-3xl bg-primary p-2 rounded-lg text-white">
                  SNOWCORE.
                </h1>
              </div>
              <h2 className="text-xl text-gray-500">login to your account</h2>
              <form onSubmit={submitHandler}>
                <div className="pt-10 pr-20 mx-auto">
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email..."
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-3 px-3 border hover: border-gray-500 shadow-lg rounded-2xl text-base border-gray-400"
                  />
                </div>
                <div className="pt-2 pr-20">
                  <input
                    value={password}
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password..."
                    className=" w-full py-3 px-3 border hover: border-gray-500 shadow-lg rounded-2xl text-base border-gray-400 mx-auto"
                  />
                  <a
                    href=""
                    className="text-sm font-sans font-medium text-gray-600 underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="text-sm font-sans font-medium w-full pr-20 pt-5 text-center mx-auto">
                  <button
                    type="submit"
                    className="text-center w-full py-4 bg-primary hover:bg-dark-mode  text-white shadow-lg rounded-2xl mx-auto font-bold "
                  >
                    <div className="flex flex-row items-center">
                      <div className="mx-auto flex">
                        <div className="text-center">SIGN IN</div>
                        {loading && <Spinner />}
                      </div>
                    </div>
                  </button>
                  <a
                    href="/register"
                    className="text-sm font-sans font-medium text-gray-500 underline mx-auto text-center"
                  >
                    Don´t have an account? Sign up
                  </a>
                  <h1 className="mt-2 text-xl font-bold text-red-400">
                    Admin: <br></br> email: admin@snowcore.com <br></br>pass:
                    admin123
                  </h1>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
