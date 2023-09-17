import Image from "next/image";
import React from "react";

const EpisodeRow = ({ title, description, currentEpisode, setCurrentEpisode, index, imgUrl, activityGuide }) => {
  return (
    <div
      className={`episodeRow ${index == currentEpisode && "active"}`}
      onClick={() => setCurrentEpisode(index)}
    >
      <Image
        src={imgUrl}
        width={100}
        height={100}
        alt="cover image"
      />
      <div>
        <h3>{title}</h3>
        <div className="description">{description.slice(0, 150)}...</div>
      </div>
      {/* <div className="playContainer">
        <Image src={"/icons/play.svg"} style={index == currentEpisode && {opacity: "0"}} width={30} height={30} alt="play" />
      </div> */}
    </div>
  );
};

export default EpisodeRow;
