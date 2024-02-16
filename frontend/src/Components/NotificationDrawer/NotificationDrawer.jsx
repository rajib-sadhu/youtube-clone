
import { MdNotificationsOff } from "react-icons/md";
import { IoClose } from "react-icons/io5";

const NotificationDrawer = ({ setNotifyBell, notifyBell }) => {
  return (
    <div
      className={`fixed top-0 ${
        notifyBell ? "right-0" : " -right-[40rem]"
      } duration-500 h-screen bg-sky-700 md:w-96 w-60 text-black md:p-5 p-2 z-20`}
    >
      <button
        onClick={() => setNotifyBell(false)}
        className="absolute right-5 top-3 text-4xl text-white"
      >
        <IoClose />
      </button>
      <p className="flex items-center text-center gap-1 justify-center mt-10 text-slate-200">
        No notification <MdNotificationsOff />
      </p>
      <ul className="mt-10">
        <li className="md:p-5 p-2 border rounded-md text-white cursor-pointer">
          <h5 className="font-medium md:text-base text-sm">New video launch.</h5>
          <p className="md:text-sm text-xs font-thin text-slate-200">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore,
            dolorum earum? Sint laudantium mollitia ab.
          </p>
        </li>
      </ul>
    </div>
  );
};

export default NotificationDrawer;
