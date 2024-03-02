import React from "react";
import AllVideos from "./AllVideos";
import SearchBar from "../../Components/SearchBar/SearchBar";
import NewUserMessageBox from "../../Components/NewUserMessageBox/NewUserMessageBox";

const Home = () => {
  return (
    <div>
      <div className="md:hidden" >
        <SearchBar />
      </div>
      <NewUserMessageBox/>
      <AllVideos />
    </div>
  );
};

export default Home;
