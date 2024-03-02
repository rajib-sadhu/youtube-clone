import { Link } from "react-router-dom";

const NewUserMessageBox = () => {

  


  return (
    <div className="fixed bottom-0 right-0 top-0 left-0 w-full z-50">
      <div className="w-full h-full backdrop-blur-sm flex items-center justify-center px-5 ">
        <div className="fixed bottom-4 right-4 bg-white shadow-md rounded-md p-4 flex items-center space-x-3">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg rounded-md p-8 flex flex-col items-center space-y-6 w-11/12 md:w-96">
            <h1 className="text-2xl md:text-2xl font-bold text-center">
              Welcome to Y-clone
            </h1>
            <p className="text-sm md:text-base text-center">
              Unleash your imagination, explore endless videos, and connect with
              creators.
            </p>
            <Link
              to="/register"
              className="bg-white text-blue-500 px-4 md:px-6 py-2 rounded-full font-semibold hover:bg-blue-100 hover:text-blue-600 transition duration-300 ease-in-out"
            >
              Join Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewUserMessageBox;
