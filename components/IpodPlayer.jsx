"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const IpodPlayer = ({ item, setEpisodeNumber, episodes, episodeNumber, isPlaying, setIsPlaying }) => {
  // find the index of the object item in the list episodes
  const [index, setIndex] = useState(0);
  const [play, setPlay] = useState(true);

  useEffect(() => {
    const index = episodes.findIndex((episode) => episode.title === item.title);
    setIndex(index);
  }, [episodes]);

  useEffect(() => {
    if (index === episodeNumber && isPlaying) {
      setPlay(true);
    } else {
      setPlay(false);
    }
  }, [index, episodeNumber, isPlaying]);

  function handleClick() {
    if (index === episodeNumber) {
      setPlay(!play);
      setIsPlaying(!isPlaying);
    } else { 
      setEpisodeNumber(index);
    }
  }

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
        onClick={handleClick}
      >
        <Image
          src={`/icons/${play ? "pause" : "play"}.svg`}
          style={!play && { transform: "translateX(2px)" }}
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
