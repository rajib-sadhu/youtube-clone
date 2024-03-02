import VideoCard from "../../Components/VideoCard/VideoCard";

const AllVideos = () => {
  return (
    <div className="md:px-40 px-2 md:py-16 py-6">
      <div className="grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-5">
        {[...Array(6)].map((_, i) => (
          <VideoCard />
        ))}
      </div>
    </div>
  );
};

export default AllVideos;
