import React from "react";

const HomeVideo = () => {
  return (
    <div className="w-full">
      <video src="https://backend.nexuspublication.com/storage/HeroVideo.mp4" className="w-full" autoPlay muted playsInline />
    </div>
  );
};

export default HomeVideo;
