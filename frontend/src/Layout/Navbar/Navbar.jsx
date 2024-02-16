import { IoNotifications } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import NotificationDrawer from "../../Components/NotificationDrawer/NotificationDrawer";
import SearchBar from "../../Components/SearchBar/SearchBar";

const Navbar = () => {
  const [notifyBell, setNotifyBell] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const [user, setUser] = useState(false);

  return (
    <>
      <div className="md:px-40 py-5 px-2 flex justify-between items-center">
        <div className="flex items-center gap-10">
          <h1 className="md:text-2xl text-xl font-semibold -mt-3">Y-clone</h1>
          <div className=" md:block hidden">
            <SearchBar />
          </div>
        </div>
        <ul className="flex items-center gap-5">
          <li>
            <button
              onClick={() => setNotifyBell(true)}
              className="text-xl hover:rotate-12 hover:text-sky-300"
            >
              <IoNotifications />
            </button>
          </li>
          <li className="relative">
            {user ? (
              <>
                <div
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 -mt-2 border md:px-2 md:py-1 hover:text-black hover:bg-sky-300 cursor-pointer rounded-full "
                >
                  <p className="text-xs md:block hidden">Rajib Sadhu</p>
                  <img
                    src="https://t3.ftcdn.net/jpg/03/91/19/22/360_F_391192211_2w5pQpFV1aozYQhcIw3FqA35vuTxJKrB.jpg"
                    alt="profile picture"
                    className="w-8 h-8 rounded-full border"
                  />
                </div>
                <ul
                  className={`${
                    userDropdown
                      ? " -bottom-[4rem] md:left-0 -left-10 border-b border-e border-s md:w-full rounded-md"
                      : "max-h-0 max-w-0 p-0"
                  }  overflow-hidden absolute z-10 md:bg-transparent bg-slate-800`}
                >
                  <li>
                    <Link className="md:px-2 px-3 py-1 block hover:bg-sky-300 hover:text-sky-800">
                      Profile
                    </Link>
                  </li>
                  <li onClick={() => setUser(false)}>
                    <Link className="md:px-2 px-3 py-1 block hover:bg-sky-300 hover:text-sky-800">
                      Logout
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <button
                onClick={() => setUser(true)}
                className="-mt-2 border md:px-4 px-3 md:py-1 hover:text-black hover:bg-sky-300 cursor-pointer rounded-full"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>

      <div>
        <NotificationDrawer
          notifyBell={notifyBell}
          setNotifyBell={setNotifyBell}
        />
      </div>
    </>
  );
};

export default Navbar;
