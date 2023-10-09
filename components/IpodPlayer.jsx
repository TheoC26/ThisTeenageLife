"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const IpodPlayer = ({ item, setEpisodeNumber, episodes }) => {
  // find the index of the object item in the list episodes
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const index = episodes.findIndex((episode) => episode.title === item.title);
    console.log(index)
    setIndex(index);
  }, [episodes]);

  return (
    <div className="ipodPlayer" style={{ backgroundColor: "#f0dcff" }}>
      <div className="featuredEpisodeImageContainer">
        <Image
          className="image"
          src={item && item.itunes.image}
          alt="Featured Episode Cover Image"
          width={100}
          height={100}
        />
        <div className="title">{item && item.title}</div>
      </div>
      <button
        className="controlIconContianer"
        onClick={() => setEpisodeNumber(index)}
      >
        <Image
          src={`/icons/play.svg`}
          style={{ transform: "translateX(2px)" }}
          alt="play"
          width={60}
          height={60}
          className="playImage"
        />
      </button>
    </div>
  );
};

export default IpodPlayer;
