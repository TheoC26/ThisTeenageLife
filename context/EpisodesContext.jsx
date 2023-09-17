"use client";
import React, { useContext, useState, useEffect } from "react";
import Parser from "rss-parser";

const EpisodesContext = React.createContext();
const RSS_URL = `http://feeds.libsyn.com/169844/rss/`;
// const RSS_URL = `/rss.xml`; // for offline testing

export function useEpisodes() {
  return useContext(EpisodesContext);
}
export function EpisodesProvider({ children }) {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchRSS = async () => {
      const parser = new Parser();
      const feed = await parser.parseURL(RSS_URL);
      setEpisodes(feed.items);
    };
    fetchRSS();
  }, []);

  const value = {
    episodes,
  };

  return (
    <EpisodesContext.Provider value={value}>
      {children}
    </EpisodesContext.Provider>
  );
}
