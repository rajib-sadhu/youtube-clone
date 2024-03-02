import { FaUser, FaImage, FaUserCheck } from "react-icons/fa6";
import { TbPasswordUser } from "react-icons/tb";
import { IoMdPhotos, IoIosMail } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import SocialLogin from "../Shared/SocialLogin";

import bg from "../../assets/login-bg.jpg";
import image from "../../assets/login-image.svg";
import axios from "axios";
import { useForm } from "react-hook-form";
import { validateImage } from "../../utils/validateImage";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/v1/users/register", data);
      console.log(res);
    } catch (error) {
      console.log(error);
      // const errorMessage = error.response.data.match(/<pre>(.*?)<\/pre>/)[1];
      // alert(errorMessage); // Or display the message in a modal, toast, etc.
    }
  };
  console.log(errors);

  return (
    <div
      className="md:relative md:min-h-screen bg-cover bg-center flex md:items-center py-2 md:px-40 px-2 md:flex-row flex-col-reverse"
      //   style={{ backgroundImage: `url(${bg})` }}
    >
      <img src={image} alt="login image" className=" md:w-[30rem]" />
      <div className="md:absolute md:w-[35rem] right-10 top-10  bg-sky-300 text-sky-700 overflow-hidden rounded-lg">
        <div className="md:p-10 p-5">
          <h1 className="text-4xl font-semibold">Register</h1>
          <div className="my-5">
            <h4 className="text-xl font-medium">Hello Everyone</h4>
            <p className="">
              Welcome to Y-clone, create your account below to start Y-clone.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="Name" className="text-xl font-medium">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="px-2 py-1 bg-transparent outline outline-1 placeholder:text-slate-600 focus:bg-white focus:outline-sky-700"
                {...register("fullName", { required: true, maxLength: 80 })}
              />
              <FaUser className="absolute bottom-0 right-0 bg-sky-700 h-8 w-8 p-1 text-white" />
            </div>
            <p className="text-red-800">
              {errors.fullName?.type === "required" && "Name is required"}
            </p>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="Username" className="text-xl font-medium">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="px-2 py-1 bg-transparent outline outline-1 placeholder:text-slate-600 focus:bg-white focus:outline-sky-700"
                {...register("username", {
                  required: true,
                  maxLength: 20,
                  minLength: 4,
                })}
              />
              <FaUserCheck className="absolute bottom-0 right-0 bg-sky-700 h-8 w-8 p-1 text-white" />
            </div>
            <p className="text-red-800">
              {errors.username?.type === "required" && "Username is required"}
              {errors.username?.type === "minLength" &&
                "Minimum length 4 required"}
              {errors.username?.type === "maxLength" &&
                "Maximum length 20 required"}
            </p>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="Email" className="text-xl font-medium">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter email"
                className="px-2 py-1 bg-transparent outline outline-1 placeholder:text-slate-600 focus:bg-white focus:outline-sky-700"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              <IoIosMail className="absolute bottom-0 right-0 bg-sky-700 h-8 w-8 p-1 text-white" />
            </div>
            <p className="text-red-800">
              {errors.email?.type === "required" && "Email is required"}
              {errors.email?.type === "pattern" &&
                "Please enter the correct email."}
            </p>
            {/* <div className="flex gap-2 justify-between items-center"> */}
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="text-xl font-medium">
                Avatar
              </label>
              <input
                type="file"
                className="bg-transparent outline outline-1 placeholder:text-slate-600 focus:bg-white focus:outline-sky-700 w-full file-input file-input-sm"
                {...register("avatar", {
                  required: true,
                  validate: (value) => validateImage(value),
                })}
              />
              <IoMdPhotos className="absolute bottom-0 right-0 bg-sky-700 h-8 w-8 p-1 text-white" />
            </div>
            <p className="text-red-800">
              {errors.avatar?.type === "required" && "Avatar is required"}
              {errors.avatar && errors.avatar.message}
            </p>
            {/* <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="text-xl font-medium">
                Cover Image
              </label>
              <input
                type="file"
                className="bg-transparent outline outline-1 placeholder:text-slate-600 focus:bg-white focus:outline-sky-700 w-full file-input file-input-sm"
                {...register("coverImage", {
                  validate: validateImage,
                })}
              />
              <FaImage className="absolute bottom-0 right-0 bg-sky-700 h-8 w-8 p-1 text-white" />
            </div> */}
            {/* </div> */}
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="password" className="text-xl font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter password"
                className="px-2 py-1 bg-transparent outline outline-1 placeholder:text-slate-600 focus:bg-white focus:outline-sky-700"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                  // pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                })}
              />
              <TbPasswordUser className="absolute bottom-0 right-0 bg-sky-700 h-8 w-8 p-1 text-white" />
            </div>
            <p className="text-red-800">
              {errors.password?.type === "required" && "Password is required"}
              {errors.password?.type === "minLength" &&
                "Minimum length 4 required"}
              {errors.password?.type === "maxLength" &&
                "Maximum length 20 required"}
            </p>
            {/* <div className="flex justify-between items-center">
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
          </div> */}

            <div className=" pt-2 flex justify-center">
              <button className="bg-sky-700 text-white md:px-10 px-4 md:pb-3 pb-2 md:pt-2 pt-2 md:text-xl rounded-md">
                Sign up
              </button>
            </div>
          </form>
          <div className="pt-2">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-sky-700 underline">
                Login
              </Link>{" "}
              now.
            </p>
          </div>
          <div>
            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
