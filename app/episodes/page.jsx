"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useEpisodesv2 } from "@/context/EpisdoesContextv2";
import Image from "next/image";
import EpisodeRow from "@/components/EpisodeRow";
import SearchBar from "@/components/SearchBar";
import Head from "next/head";
import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";

const episodes = () => {
  const searchParams = useSearchParams();
  const urlSearchValue = searchParams.get("search");
  const { episodes, setEpisodeNumber, episode, play, setPlay, episodeNumber } =
    useEpisodesv2();
  const [season, setSeason] = useState(6);
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [resources, setResources] = useState([]);
  const [isRecources, setIsRecources] = useState(false);

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
    // get all of the documents from the "educationalResources" collection
    const getEducationalResources = async () => {
      try {
        const snapshot = await getDocs(collection(db, "educationalResources"));
        snapshot.forEach((doc) => {
          setResources((prev) => [...prev, doc.data()]);
          console.log(doc.id, "=>", doc.data());
        });
      } catch (error) {
        console.error(error);
      }
    };

    getEducationalResources();
  }, []);

  useEffect(() => {
    //check if the episode has a recource
    resources.forEach((resource) => {
      if (resource.episodeName === episode.title) {
        setIsRecources(true);
      } else {
        setIsRecources(false);
      }
    });
  }, [episodeNumber]);



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
                id="seasons-7"
                name="seasons"
                onChange={() => setSeason(7)}
              />
              <label className="season" for="seasons-7">
                7
              </label>
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
        <div className="left-side-container">
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
          {isRecources && <Link className="view-recource" href={"edrecources/"+episode.title}>View educational recource!</Link>}
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
                      resources={resources}
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
                      resources={resources}
                    />
                  )
              )}
        </div>
      </div>
    </div>
  );
};

export default episodes;
