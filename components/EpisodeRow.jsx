"use client"
import Image from "next/image";
import React, {useState, useEffect} from "react";


const EpisodeRow = ({ title, description, currentEpisode, setCurrentEpisode, index, imgUrl, activityGuide }) => {
  // get the dimentions of the screen on load
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);
  
  return (
    <div
      className={`episodeRow ${index == currentEpisode && "active"}`}
      onClick={() => setCurrentEpisode(index)}
    >
      <Image src={imgUrl} width={100} height={100} alt="cover image" />
      <div>
        <h3>{title}</h3>
        <div className="description">
          {screenWidth > 1200
            ? description.slice(0, 150)
            : screenWidth > 420
            ? description.slice(0, 100)
            : description.slice(0, 75)}
          ...
        </div>
      </div>
      {/* <div className="playContainer">
        <Image src={"/icons/play.svg"} style={index == currentEpisode && {opacity: "0"}} width={30} height={30} alt="play" />
      </div> */}
    </div>
  );
};

export default EpisodeRow;
