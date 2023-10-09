"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useEpisodesv2 } from "@/context/EpisdoesContextv2";

const BottomEpisodePlayer = () => {
  const { episodes, setEpisodeNumber, episode, play, setPlay, duration, durationRef, setDuration, currentTime, setCurrentTime, autoPlay, setAutoPlay } =
    useEpisodesv2();

  const playAnimationRef = useRef(null);
  const sliderRef = useRef(null);
  const audioRef = useRef(null);

  const [isShowing, setIsShowing] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    sliderRef.current.addEventListener("mousedown", (e) => {
      e.preventDefault();
      let x = e.clientX;
      let percent = x / window.innerWidth;
      audioRef.current.currentTime = Math.min(
        Math.max(percent * durationRef.current, 0),
        durationRef.current
      );
      setCurrentTime(audioRef.current.currentTime);
      const mouseMove = (e) => {
        x = e.clientX;
        percent = x / window.innerWidth;
        audioRef.current.currentTime = Math.min(
          Math.max(percent * durationRef.current, 0),
          durationRef.current
        );
        setCurrentTime(audioRef.current.currentTime);
      };
      const mouseUp = () => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
      };
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    });
  }, []);

  const repeat = () => {
    playAnimationRef.current = requestAnimationFrame(repeat);
    setCurrentTime(audioRef.current.currentTime);
  };
  useEffect(() => {
    if (play) {
      setAutoPlay(true);
      playAnimationRef.current = requestAnimationFrame(repeat);
      audioRef.current.play();
    } else {
      audioRef.current.pause(); 
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [play]);


  function onLoadedData() {
    setDuration(audioRef.current.duration);
  }

  return (
    <div style={!autoPlay && { display: "none" }}>
      <audio
        src={episode && episode.enclosure.url}
        ref={audioRef}
        onLoadedData={onLoadedData}
      ></audio>
      <div className="bottom-player">
        <Image
          src={episode && episode.itunes.image}
          alt="player base"
          width={100}
          height={100}
          className="episodeImage"
        />
        <div className="right-side">
          <div className="title">{episode && episode.title}</div>
          <div className="description">
            {episode &&
              (screenWidth > 1000
                ? episode.contentSnippet.slice(0, 150)
                : screenWidth > 420 ? episode.contentSnippet.slice(0, 100)
                : episode.contentSnippet.slice(0, 50))}
            ...
          </div>
        </div>
        <button className="controlIconContianer" onClick={() => setPlay(!play)}>
          <Image
            src={`/icons/${play ? "pause" : "play"}White.svg`}
            style={!play && { transform: "translateX(2px)" }}
            alt="play"
            width={60}
            height={60}
            className="playImage"
          />
        </button>
        <div className="slider" ref={sliderRef}>
          <div
            className="duration"
            style={{ width: (currentTime * 100) / duration + "%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default BottomEpisodePlayer;
