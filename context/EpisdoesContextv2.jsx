"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import useStateRef from "@/hooks/stateRef";

const Episodesv2Context = React.createContext();

export function useEpisodesv2() {
  return useContext(Episodesv2Context);
}

export function Episodesv2Provider({ children }) {
  const playAnimationRef = useRef(null);
  const [episodes, setEpisodes] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState(-1);
  const [episode, setEpisode] = useState(null);
  const [play, setPlay] = useState(false);
  const [autoPlay, setAutoPlay, autoPlayRef] = useStateRef(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration, durationRef] = useStateRef(0);
  const [isShowing, setIsShowing, isShowingRef] = useStateRef(false);

  const repeat = () => {
    playAnimationRef.current = requestAnimationFrame(repeat);
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        const response = await fetch("/api/fetchRSS");
        if (!response.ok) {
          throw new Error("Failed to fetch RSS feed");
        }
        const data = await response.json();
        setEpisodes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRSS();
  }, []);

  // useEffect(() => {
  //   let tempPlay = false;
  //   setEpisode(episodes[episodeNumber]);
  //   if (episodeNumber != -1) {
  //     setAutoPlay(true);
  //     tempPlay = true;
  //   }
  //   if (autoPlayRef.current || tempPlay) {
  //     setPlay(false);
  //     setTimeout(() => setPlay(true), 100);
  //     setCurrentTime(0);
  //   } else {
  //     setPlay(false);
  //     setCurrentTime(0);
  //   }
  // }, [episodeNumber]);
  useEffect(() => {
    //  let tempPlay = false;
    setEpisode(episodes[episodeNumber]);
    //  if (episodeNumber != -1) {
    //    setAutoPlay(true);
    //    tempPlay = true;
    //  }
    if (autoPlayRef.current) {
      setIsShowing(true);
      setPlay(false);
      setTimeout(() => setPlay(true), 100);
      setCurrentTime(0);
    } else {
      setAutoPlay(true);
      setPlay(false);
      setCurrentTime(0);
    }
  }, [episodeNumber]);

  function onLoadedData() {
    setDuration(audioRef.current.duration);
  }

  const value = {
    episodes,
    setEpisodeNumber,
    episodeNumber,
    episode: episodes[episodeNumber],
    play,
    setPlay,
    duration,
    durationRef,
    setDuration,
    currentTime,
    setCurrentTime,
    autoPlay,
    setAutoPlay,
    isShowing,
  };

  return (
    <Episodesv2Context.Provider value={value}>
      {children}
    </Episodesv2Context.Provider>
  );
}
