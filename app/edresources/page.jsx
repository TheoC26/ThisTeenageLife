"use client";
import { useState, useEffect, useRef } from "react";
import useStateRef from "../../hooks/stateRef";
import { db } from "../../firebase.js";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  limit,
  startAfter,
  limitToLast,
} from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import RandomDrawings from "@/components/RandomDrawings";
import TapeRow from "@/components/TapeRow";
import TapedPaper from "@/components/TapedPaper";
import BlogSearchBar from "@/components/BlogSearchBar";
import Polaroids from "@/components/Polaroids";
import SearchBar from "@/components/SearchBar";

const POSTS_PER_PAGE = 20;

const EdResources = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [resources, setResources] = useState([]);
  const [searchedResources, setSearchedResources, searchedResourcesRef] =
    useStateRef([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchResources = async () => {
    try {
      setLoading(true);
      let q = query(collection(db, "/educationalResources"));

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      var tempArr = [];
      snapshot.forEach((doc) => {
        tempArr.push(
          Object.assign(doc.data(), {
            id: doc.id,
          })
        );
      });
      setResources(tempArr);
      setSearchedResources(tempArr);
    } catch (err) {
      setError("Failed to load resources");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Handle search functionality
  useEffect(() => {
    searchResources();
  }, [search]);

  function convertDateToFormattedDate(date) {
    const unixTimestamp = date.seconds;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    return `${
      dateObject.getMonth() + 1
    }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
  }

  function convertDateToFormattedDate(date) {
    const unixTimestamp = date.seconds;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    return (
      dateObject.getMonth() +
      1 +
      "/" +
      dateObject.getDate() +
      "/" +
      dateObject.getFullYear()
    );
  }

  async function searchResources(e) {
    if (e) e.preventDefault();
    try {
      // filter resources if search is in the title
      const filteredResources = resources.filter((post) =>
        post.episodeName.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedResources(filteredResources);
    } catch (err) {
      setError("Failed to load resources");
      console.log(err);
    }
  }

  return (
    <main className="blogPage">
      <RandomDrawings />

      <div className="heading">
        <div className="tape-section"></div>
        Educational Resources
      </div>

      <SearchBar
        type="episode"
        search={search}
        setSearch={setSearch}
        submit={searchResources}
        setIsSearching={setIsSearching}
      />

      <div style={{ height: "20px" }}></div>

      {!isSearching
        ? resources.map((post) => (
            <TapeRow
              key={post.id}
              title={post.episodeName}
              type={""}
              name={""}
              id={post.episodeName}
              isEpisode={true}
            />
          ))
        : searchedResources.map((post) => (
            <TapeRow
              key={post.id}
              title={post.episodeName}
              type={""}
              name={""}
              id={post.episodeName}
              isEpisode={true}
            />
          ))}
      {loading && <div className="loading">Loading...</div>}
    </main>
  );
};

export default EdResources;
