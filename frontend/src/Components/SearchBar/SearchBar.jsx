
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <>
      <form className="relative md:px-0 px-2">
        <input
          type="text"
          placeholder="Search for video"
          className="p-2 h-full md:w-96 w-full rounded-md bg-slate-700"
        />
        <button className="absolute md:right-2 right-4 top-3 duration-150 hover:text-sky-300">
          <FaSearch />
        </button>
      </form>
    </>
  );
};

export default SearchBar;
