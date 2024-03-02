import { FaUser } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import { Link } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin";

import bg from "../../assets/login-bg.jpg";
import image from "../../assets/login-image.svg";

const Login = () => {
  return (
    <div
      className="md:relative md:min-h-screen bg-cover bg-center flex md:items-center py-2 md:px-40 px-2 md:flex-row flex-col-reverse"
      //   style={{ backgroundImage: `url(${bg})` }}
    >
      <img src={image} alt="login image" className=" md:w-[30rem]" />
      <div className="md:absolute md:w-[35rem] bg-sky-300 text-sky-700 p-10 rounded-lg right-10 top-1/2 md:-translate-y-1/2">
        <h1 className="text-4xl font-semibold">Login</h1>
        <div className="my-5">
          <h4 className="text-xl font-medium">Hello Everyone, Welcome Back</h4>
          <p className="">Welcome to Y-clone, please login to your account.</p>
        </div>
        <form className="space-y-5">
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="Email" className="text-xl font-medium">
              Email or Username
            </label>
            <input
              type="email"
              placeholder="Enter email or username"
              className="px-2 py-1 bg-transparent outline outline-1 placeholder:text-slate-600 focus:bg-white focus:outline-sky-700"
            />
            <FaUser className="absolute bottom-0 right-0 bg-sky-700 h-8 w-8 p-1 text-white" />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label htmlFor="Email" className="text-xl font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="px-2 py-1 bg-transparent outline outline-1 placeholder:text-slate-600 focus:bg-white focus:outline-sky-700"
            />
            <TbPasswordUser className="absolute bottom-0 right-0 bg-sky-700 h-8 w-8 p-1 text-white" />
          </div>
          <div className="flex justify-between items-center">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className=" text-sky-700 text-sm">Remember me</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs outline outline-1 ms-2"
                />
              </label>
            </div>
            <Link className="text-sm link ">Forget Password?</Link>
          </div>
          <div className="flex justify-center">
            <button className="bg-sky-700 text-white md:px-10 px-4 md:pb-3 pb-2 md:pt-2 pt-2 md:text-xl rounded-md">
              Login
            </button>
          </div>
          <div>
            <p>
              {" "}
              Don't have an account?{" "}
              <Link to="/register" className="text-sky-700 underline">
                Sign up
              </Link>{" "}
              here.
            </p>
          </div>
        </form>
        <div>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
