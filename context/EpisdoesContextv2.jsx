"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import useStateRef from "@/hooks/stateRef";
import Parser from "rss-parser";

const Episodesv2Context = React.createContext();
const RSS_URL = `http://feeds.libsyn.com/169844/rss/`;
// const RSS_URL = `/rss.xml`; // for offline testing

export function useEpisodesv2() {
  return useContext(Episodesv2Context);
}
export function Episodesv2Provider({ children }) {
  const playAnimationRef = useRef(null);
  // const audioRef = useRef(null);
  const [episodes, setEpisodes] = useState([]);
  const [episodeNumber, setEpisodeNumber] = useState(0);
  const [episode, setEpisode] = useState(null);
  const [play, setPlay] = useState(false);
  const [autoPlay, setAutoPlay, autoPlayRef] = useStateRef(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration, durationRef] = useStateRef(0);

  const repeat = () => {
    playAnimationRef.current = requestAnimationFrame(repeat);
    setCurrentTime(audioRef.current.currentTime);
  };

  useEffect(() => {
    const fetchRSS = async () => {
      const parser = new Parser();
      const feed = await parser.parseURL(RSS_URL);
      setEpisodes(feed.items);
    };
    fetchRSS();
  }, []);
  useEffect(() => {
    setEpisode(episodes[episodeNumber]);
    if (episodeNumber != 0) {
      setAutoPlay(true);
    }
    if (autoPlayRef.current) {
      // audioRef.current.play();
      setPlay(false);
      setTimeout(() => setPlay(true), 100);
      setCurrentTime(0);
    } else {
      // audioRef.current.pause();
      setPlay(false);
      setCurrentTime(0);
    }
  }, [episodeNumber]);

  // useEffect(() => {
  //   if (play) {
  //     playAnimationRef.current = requestAnimationFrame(repeat);
  //   } else {
  //     // audioRef.current.pause();
  //     cancelAnimationFrame(playAnimationRef.current);
  //   }
  // }, [play]);

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
  };
  return (
    <Episodesv2Context.Provider value={value}>
      {children}
    </Episodesv2Context.Provider>
  );
}
