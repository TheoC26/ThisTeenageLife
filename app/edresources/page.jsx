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
      {/* <RandomDrawings /> */}

      <div className="heading">
        <div className="tape-section"></div>
        Educational Resources
      </div>

      <div className="information">
        <div class="bottomSpace">
          Here are our tips for centering youth voice and choice and using This
          Teenage Life in your school!
        </div>
        <ul>
          <li>
            {" "}
            <span class="guideInstructions">Start as a club:</span> Consent is
            one of our core values. Research shows that if young people actively{" "}
            <i>choose</i> to be a part of an activity, they'll be more engaged
            and committed. If you want to go deep and develop a long-term
            conversation community, start by forming a small, opt-in club with
            ~6 young people.{" "}
          </li>
          <li>
            <span class="guideInstructions">
              In the classroom...small groups and youth choice:
            </span>{" "}
            Start by making small groups (~6-8 young people in each group). Each
            group should choose their topic for each session. These groups
            should be consistent so that they develop a rhythm and sense of
            trust over time. In-person or using Zoom breakout rooms we recommend
            that groups are made beforehand (put folks who are friendly
            together). <br />
            <br /> A day or two before the conversation, <i>
              young people
            </i>{" "}
            should choose the episode they're going to explore. At home, before
            the conversation, they can listen to the episode and use the
            journaling prompts in the guide. After the conversation they can do
            the activities together or at home individually. We recommend that
            for a <i>while</i> groups choose episodes and topics from the first
            two sections below. We had been working together for almost two
            years when we had most of the conversations in the third section.
            <br />
            <br />{" "}
          </li>
          <li>
            {" "}
            <span class="guideInstructions">Pre-listen:</span> We recommend,
            especially in the beginning, that you listen to the podcast before
            having a discussion. It models active listening, authentic sharing,
            and storytelling around the topic at hand. That said, if some folks
            don't have the chance to listen, no worries! We've made the guides
            accessible no matter what!
          </li>
          <br />
          <br />
          <li>
            <span class="guideInstructions">
              No grades, no forced participation:
            </span>{" "}
            This Teenage Life is meant to help develop trust and relationships
            based on personal storytelling and identity-based conversations.
            Thus, these conversations and the affiliated work shouldn't be
            graded. In addition, cold-calling or cajoled participation shouldn't
            happen either. People will talk when they feel comfortable and when
            they have something to say.
          </li>
        </ul>

        <p>
          Each conversation and activity guide goes with an episode of the
          podcast, This Teenage Life, which can be heard in the{" "}
          <a href="http://thisteenagelife.org/episodes">"episodes" section</a>{" "}
          of this website, and on podcast apps including{" "}
          <a href="https://podcasts.apple.com/us/podcast/this-teenage-life/id1456067511">
            Apple Podcasts
          </a>{" "}
          and{" "}
          <a href="https://open.spotify.com/show/2YGaei3I55DO2I7FsRUd5h">
            Spotify.
          </a>{" "}
          <br />
          <br /> If you're an educator using these guides with your students,
          below are some of our recommendations. <br />
          <br />
        </p>
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
