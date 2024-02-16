import { useState } from 'react';
import { RiPlayCircleFill } from 'react-icons/ri';

const VideoCard = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-80 shadow rounded-md relative cursor-pointer overflow-hidden hover:opacity-70"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://cdn.sanity.io/images/7g6d2cj1/production/54b21fba64cdfa786ccafcb5f81cf3a4e6846f9f-1280x720.jpg"
        alt="video thumbnail"
        className="h-52 w-full object-cover"
      />
      {isHovered && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20">
          <RiPlayCircleFill className="text-white text-6xl" />
        </div>
      )}
      <div className="badge badge-sm absolute top-[11.8rem] right-1 py-1">
        10:52
      </div>
      <div className="p-3 flex gap-3">
        <img
          src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
          alt="Video owner profile picture"
          className="w-12 h-12 object-cover rounded-full"
        />
        <div className="space-y-1">
          <h2 className="text-lg leading-5 font-semibold">
            This is the main title I want to this time to biggg.
          </h2>
          <p className="text-accent font-light text-sm">Channel name</p>
          <p className="text-xs font-extralight text-slate-300">
            <span>0 views</span> - <span>1 seconds ago</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
