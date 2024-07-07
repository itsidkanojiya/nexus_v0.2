import React from "react";

const HomeVideo = () => {
  return (
    <div className="w-full">
      <video src="/public/HeroVideo.mp4" className="w-full" autoPlay muted playsInline />
    </div>
  );
};

export default HomeVideo;
