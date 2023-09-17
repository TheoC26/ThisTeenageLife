"use client";
import EpisodeRow from "@/components/EpisodeRow";
import Playlist from "@/components/Playlist";
import SearchBar from "@/components/SearchBar";
import TopMediaPlayer from "@/components/TopMediaPlayer";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useEpisodes } from "@/context/EpisodesContext";

const episodesv1 = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [season, setSeason] = useState(5);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const { episodes } = useEpisodes();

  useEffect(() => {
    // only set autoplay to true if the user clicks on a new episode
    if (currentEpisode != 0) {
      setAutoPlay(true);
    }
  }, [currentEpisode]);


  const submitSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    console.log(search)
  };


  return (
    <main className="episodesPage">
      <SearchBar
        type="episode"
        search={search}
        setSearch={setSearch}
        setIsSearching={setIsSearching}
        submit={submitSearch}
      />
      <TopMediaPlayer item={episodes[currentEpisode]} autoPlay={autoPlay} page={"episode"} />
      <div className="seasons-container">
        <input
          type="radio"
          id="seasons-5"
          name="seasons"
          onChange={() => setSeason(5)}
        />
        <label className="season" for="seasons-5">
          season 5
        </label>
        <input
          type="radio"
          id="seasons-4"
          name="seasons"
          onChange={() => setSeason(4)}
        />
        <label className="season" for="seasons-4">
          season 4
        </label>
        <input
          type="radio"
          id="seasons-3"
          name="seasons"
          onChange={() => setSeason(3)}
        />
        <label className="season" for="seasons-3">
          season 3
        </label>
        <input
          type="radio"
          id="seasons-2"
          name="seasons"
          onChange={() => setSeason(2)}
        />
        <label className="season" for="seasons-2">
          season 2
        </label>
        <input
          type="radio"
          id="seasons-1"
          name="seasons"
          onChange={() => setSeason(1)}
        />
        <label className="season" for="seasons-1">
          season 1
        </label>
        <span className="glider"></span>
      </div>
      <div className="episodesList">
        {episodes.map(
          (episode, i) =>
            season == episode.itunes.season && (
              <EpisodeRow
                key={i}
                index={i}
                title={episode.title}
                imgUrl={episode.itunes.image}
                description={episode.contentSnippet}
                currentEpisode={currentEpisode}
                setCurrentEpisode={setCurrentEpisode}
              />
            )
        )}
      </div>
      {isSearching && (
        <div className="searchList">
          {episodes.map(
            (episode, i) =>
              (episode.title.toLowerCase().includes(search.toLowerCase()) ||
                episode.contentSnippet
                  .toLowerCase()
                  .includes(search.toLowerCase())) && (
                <EpisodeRow
                  key={i}
                  index={i}
                  title={episode.title}
                  imgUrl={episode.itunes.image}
                  description={episode.contentSnippet}
                  currentEpisode={currentEpisode}
                  setCurrentEpisode={setCurrentEpisode}
                />
              )
          )}
        </div>
      )}
    </main>
  );
};

export default episodesv1;
