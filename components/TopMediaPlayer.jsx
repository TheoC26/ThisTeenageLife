"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import EpisodePlayer from "./EpisodePlayer";
import useStateRef from "@/hooks/stateRef";

const TopMediaPlayer = ({ item, autoPlay, page }) => {
  const audioRef = useRef(null);
  const playAnimationRef = useRef(null);
  const playerBaseRef = useRef(null);
  const cursorRef = useRef(null);
  const [play, setPlay] = useState(false);
  // const [duration, setDuration] = useState(0); // audioRef.current.duration
  const [duration, setDuration, durationRef] = useStateRef(0); // audioRef.current.duration
  const [currentTime, setCurrentTime] = useState(0);

  const repeat = () => {
    playAnimationRef.current = requestAnimationFrame(repeat);
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    const sliderRect = playerBaseRef.current.getBoundingClientRect();
    cursorRef.current.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const mouseMove = (e) => {
        const x = e.clientX - sliderRect.left - 25;
        const percent = x / (sliderRect.width - 50);
        // recreate the following line but clamp it between 0 and the durationRef.current
        // audioRef.current.currentTime = percent * durationRef.current;
        audioRef.current.currentTime = Math.min(
          Math.max(percent * durationRef.current, 0),
          durationRef.current
        );
        setCurrentTime(audioRef.current.currentTime);
        console.log(x, percent, audioRef.current.currentTime);
      };
      const mouseUp = () => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUp);
      };
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
    });
  }, []);

  useEffect(() => {
    if (autoPlay) {
      audioRef.current.play();
      setPlay(true);
      setCurrentTime(0);
    } else {
      audioRef.current.pause();
      setPlay(false);
      setCurrentTime(0);
    }
  }, [item]);

  useEffect(() => {
    if (play) {
      audioRef.current.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current.pause();
      cancelAnimationFrame(playAnimationRef.current);
    }
    console.log(audioRef.current.currentTime);
  }, [play]);

  function onLoadedData() {
    setDuration(audioRef.current.duration);
  }

  return (
    <div className="topMediaPlayer">
      <audio
        src={item && item.enclosure.url}
        ref={audioRef}
        onLoadedData={onLoadedData}
      ></audio>
      <div className="ipodPlayer">
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
        <button className="controlIconContianer" onClick={() => setPlay(!play)}>
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
      <div className="rightSide">
        {page == "episode" ? (
          <div className="question">
            Whats something you believed as a kid that you no longer believe??
            <div className="activityGuide">Activity Guide {">"}</div>
            <Image
              src={"/decoratives/bubble.svg"}
              width={100}
              height={100}
              alt="bubble decoration"
            />
          </div>
        ) : (
          page == "home" && (
            <>
              <div className="title">{item && item.title}</div>
              <div className="description">{item && item.contentSnippet}</div>
            </>
          )
        )}

        <div className="episodePlayer">
          <div className="captions">
            {(item && page != "home") && item.contentSnippet.slice(0, 100)}
          </div>
          <div className="player">
            <Image
              className="base"
              ref={playerBaseRef}
              src={"/icons/playerBase.svg"}
              alt="player base"
              width={100}
              height={100}
            />
            <Image
              className="cursor"
              ref={cursorRef}
              src={"/icons/playerCursor.svg"}
              alt="player base"
              style={{ left: (currentTime / duration) * 90 + 5 + "%" }}
              width={50}
              height={50}
            />
          </div>
        </div>
      </div>

      {/* <Image
        src={"/decoratives/sloppyRectRound.svg"}
        style={{
          height: "104%",
          width: "101%",
          transform: "translateY(-14px) translateX(-3px)",
          strokeWidth: "1px",
        }}
        alt="Drawn border"
        width={100}
        height={100}
        className="decorative"
      /> */}
    </div>
  );
};

export default TopMediaPlayer;
