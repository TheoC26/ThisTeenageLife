"use client";
import useStateRef from "@/hooks/stateRef";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const EpisodeRow = ({
  title,
  description,
  currentEpisode,
  setCurrentEpisode,
  index,
  imgUrl,
  activityGuide,
}) => {
  // get the dimentions of the screen on load
  const [screenWidth, setScreenWidth] = useState(0);
  const [targetDescription, setTargetDescription, targetDescriptionRef] = useStateRef(150);
  const [currentDescription, setCurrentDescription, currentDescriptionRef] =
    useStateRef(150);
  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (index == currentEpisode) {
      setTargetDescription(description.length);
    } else {
      setTargetDescription(150);
    }

    const interval = setInterval(() => {
      if (currentDescriptionRef.current < targetDescriptionRef.current) {
        setCurrentDescription(currentDescriptionRef.current + 1);
      } else if (currentDescriptionRef.current > targetDescriptionRef.current) {
        setCurrentDescription(currentDescriptionRef.current - 1);
      }
    }, 5);

  }, [currentEpisode]);

  return (
    <div
      className={`episodeRow ${index == currentEpisode && "active"}`}
      onClick={() => setCurrentEpisode(index)}
    >
      <Image src={imgUrl} width={100} height={100} alt="cover image" />
      <div>
        <h3>{title}</h3>
        <div className="description">
          {/* {index == currentEpisode
            ? description
            : description.slice(0, 150) + "..."
          } */}
          {description.slice(0, currentDescription)}{currentDescription < description.length && "..."}
        </div>
      </div>
      {/* <div className="playContainer">
        <Image src={"/icons/play.svg"} style={index == currentEpisode && {opacity: "0"}} width={30} height={30} alt="play" />
      </div> */}
    </div>
  );
};

export default EpisodeRow;
