"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useEpisodesv2 } from "@/context/EpisdoesContextv2";
import Image from "next/image";
import EpisodeRow from "@/components/EpisodeRow";
import SearchBar from "@/components/SearchBar";
import Head from "next/head";

const episodes = () => {
  const searchParams = useSearchParams();
  const urlSearchValue = searchParams.get("search"); 
  const { episodes, setEpisodeNumber, episode, play, setPlay, episodeNumber } =
    useEpisodesv2();
  const [season, setSeason] = useState(6);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");

  const submitSearch = (e) => {
    e.preventDefault();
    window.location.href = `/episodes?search=${search}`;
    setIsSearching(true);
  };

  useEffect(() => {
    if (urlSearchValue) {
      setSearch(urlSearchValue);
      setIsSearching(true);
    }
  }, [])

  // useEffect(() => {
  //   console.log(isSearching);
  // }, [isSearching]);

  useEffect(() => {
    console.log(episodes)
  }, [episodes])

  return (
    <div className="episodesPage">
      <Head>
        <title>This Teenage Life - Episodes</title>
      </Head>
      <div className="top">
        <SearchBar
          type="episode"
          search={search}
          setSearch={setSearch}
          setIsSearching={setIsSearching}
          submit={submitSearch}
        />
        {isSearching ? (
          <button
            className="clear-search"
            onClick={() => setIsSearching(false)}
          >
            clear
          </button>
        ) : (
          <div className="season-outer">
            <div className="season">season:</div>
            <div className="seasons-container">
              <input
                type="radio"
                id="seasons-6"
                name="seasons"
                onChange={() => setSeason(6)}
              />
              <label className="season" for="seasons-6">
                6
              </label>
              <input
                type="radio"
                id="seasons-5"
                name="seasons"
                onChange={() => setSeason(5)}
              />
              <label className="season" for="seasons-5">
                5
              </label>
              <input
                type="radio"
                id="seasons-4"
                name="seasons"
                onChange={() => setSeason(4)}
              />
              <label className="season" for="seasons-4">
                4
              </label>
              <input
                type="radio"
                id="seasons-3"
                name="seasons"
                onChange={() => setSeason(3)}
              />
              <label className="season" for="seasons-3">
                3
              </label>
              <input
                type="radio"
                id="seasons-2"
                name="seasons"
                onChange={() => setSeason(2)}
              />
              <label className="season" for="seasons-2">
                2
              </label>
              <input
                type="radio"
                id="seasons-1"
                name="seasons"
                onChange={() => setSeason(1)}
              />
              <label className="season" for="seasons-1">
                1
              </label>
              <span className="glider"></span>
            </div>
          </div>
        )}
      </div>
      <div className="episodes-container">
        <div className="ipod-player">
          <div className="featuredEpisodeImageContainer">
            {episode && (
              <Image
                className="image"
                src={episode && episode.itunes.image}
                alt="Featured Episode Cover Image"
                width={100}
                height={100} 
              />
            )}

            <div className="title">{episode && episode.title}</div>
          </div>
          <button
            className="controlIconContianer"
            onClick={() => episode && setPlay(!play)}
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
        <div className="episodes-list">
          {!isSearching
            ? episodes.map(
                (episode, i) =>
                  season == episode.itunes.season && (
                    <EpisodeRow
                      key={i}
                      index={i}
                      title={episode.title}
                      imgUrl={episode.itunes.image}
                      description={episode.contentSnippet}
                      currentEpisode={episodeNumber}
                      setCurrentEpisode={setEpisodeNumber}
                    />
                  )
              )
            : episodes.map(
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
                      currentEpisode={episodeNumber}
                      setCurrentEpisode={setEpisodeNumber}
                    />
                  )
              )}
        </div>
      </div>
    </div>
  );
};

export default episodes;
