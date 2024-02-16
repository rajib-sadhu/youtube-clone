import React from "react";
import AllVideos from "./AllVideos";
import SearchBar from "../../Components/SearchBar/SearchBar";

const Home = () => {
  return (
    <div>
      <div className="md:hidden" >
        <SearchBar />
      </div>
      <AllVideos />
    </div>
  );
};

export default Home;
