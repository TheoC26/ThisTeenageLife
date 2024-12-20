"use client";
import recources from "@/app/recources/page";
import useStateRef from "@/hooks/stateRef";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const EpisodeRow = ({
  title,
  description,
  currentEpisode,
  setCurrentEpisode,
  index,
  imgUrl,
  resources,
}) => {
  // get the dimentions of the screen on load
  const [screenWidth, setScreenWidth] = useState(0);
  const [targetDescription, setTargetDescription, targetDescriptionRef] =
    useStateRef(150);
  const [currentDescription, setCurrentDescription, currentDescriptionRef] =
    useStateRef(150);

  const [hasResource, setHasResource] = useState(false);

  useEffect(() => {
    // go through all of the recourses and if the episode has a resource, console log it (use the names to match it up)
    resources.forEach((resource) => {
      // console.log(resource);
      if (resource.episodeName == title) {
        console.log(resource);
        setHasResource(true);
      }
    });

    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
  }, [recources]);

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
     <Link href={`/episodes/${encodeURIComponent(title)}`} className="episodeRow">
      <Image src={imgUrl} width={100} height={100} alt="cover image" />
      {hasResource && <div className="resourceIcon">⭐️</div>}
      <div>
        <h3>{title}</h3>
        {/* <div className="description">
          {description.slice(0, currentDescription)}
          {currentDescription < description.length && "..."}
        </div> */}
        <div className="description">{description.slice(0, 175)}...</div>
      </div>
      {/* <div className="playContainer">
        <Image src={"/icons/play.svg"} style={index == currentEpisode && {opacity: "0"}} width={30} height={30} alt="play" />
      </div> */}
    </Link>
  );
};

export default EpisodeRow;
