import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

import toast from "react-hot-toast";

const SocialLogin = () => {
  const handleSocial = () => toast.error("Social login not ready");

  return (
    <>
      {/* {  <div className="mt-10">
        <h5 className="text-center font-bold">OR</h5>
        <div className="border-t border-sky-700 p-5 mt-3 flex justify-center items-center gap-5">
          <button
            onClick={handleSocial}
            className="bg-red-700 text-white text-2xl p-2 rounded-full"
          >
            <FaGoogle />
          </button>
          <button
            onClick={handleSocial}
            className="bg-blue-600 text-white text-2xl p-2 rounded-full"
          >
            <FaFacebookF />
          </button>
          <button
            onClick={handleSocial}
            className="bg-white text-black text-2xl p-2 rounded-full"
          >
            <BsTwitterX />
          </button>
        </div>
      </div>} */}
    </>
  );
};

export default SocialLogin;
