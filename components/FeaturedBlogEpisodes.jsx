"use client";
import React, { useState, useEffect } from "react";
import IpodPlayer from "./IpodPlayer";
import Polaroid from "./Polaroid";
import { useEpisodesv2 } from "@/context/EpisdoesContextv2";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase.js";
import Image from "next/image";

const FeaturedBlogEpisodes = () => {
  const { episodes, setEpisodeNumber, episodeNumber, play } = useEpisodesv2();
  const [featuredBlogPosts, setFeaturedBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const collectionRef = collection(db, "/posts");
        // make it so that it only querys for posts which are featured and order by desc
        // const q = query(collectionRef, orderBy("date", "desc"));
        const q = query(collectionRef, where("featured", "==", true));
        const docSnap = await getDocs(q);
        var tempArr = [];
        docSnap.forEach((doc) => {
          tempArr.push(
            Object.assign(doc.data(), {
              id: doc.id,
              formattedDate: convertDateToFormattedDate(doc.data().date),
            })
          );
        });
        setFeaturedBlogPosts(tempArr);
      } catch (err) {
        setError("Failed to load sources");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

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

  return (
    <div className="featuredBlogEpisodes">
      <div className="featured-letters">
        <Image
          src="/navText/F.png"
          alt="F"
          width={100}
          height={100}
          className="featured-letter"
        />
        <Image
          src="/navText/E.png"
          alt="E"
          width={100}
          height={100}
          className="featured-letter"
        />
        <Image
          src="/navText/A.png"
          alt="A"
          width={100}
          height={100}
          className="featured-letter"
        />
        <Image
          src="/navText/T.png"
          alt="T"
          width={100}
          height={100}
          className="featured-letter"
        />
        <Image
          src="/navText/U.png"
          alt="U"
          width={100}
          height={100}
          className="featured-letter"
        />
        <Image
          src="/navText/R.png"
          alt="R"
          width={100}
          height={100}
          className="featured-letter"
        />
        <Image
          src="/navText/E2.png"
          alt="E2"
          width={100}
          height={100}
          className="featured-letter"
        />
        <Image
          src="/navText/D.png"
          alt="D"
          width={100}
          height={100}
          className="featured-letter"
        />
      </div>
      <div className="ipod ipod-1">
        <IpodPlayer
          item={episodes[0]}
          setEpisodeNumber={setEpisodeNumber}
          episodes={episodes}
          episodeNumber={episodeNumber}
          isPlaying={play}
        />
      </div>
      <div className="blog blog-1">
        <Polaroid
          title={featuredBlogPosts[0] && featuredBlogPosts[0].title}
          type={featuredBlogPosts[0] && featuredBlogPosts[0].type}
          name={featuredBlogPosts[0] && featuredBlogPosts[0].author}
          date={featuredBlogPosts[0] && featuredBlogPosts[0].formattedDate}
          slug={featuredBlogPosts[0] && featuredBlogPosts[0].id}
          imagePath={"/BG-Images/BG-Image-0.png"}
          isHome={false}
        />
      </div>
      <div className="ipod ipod-2">
        <IpodPlayer
          item={episodes[1]}
          setEpisodeNumber={setEpisodeNumber}
          episodes={episodes}
          episodeNumber={episodeNumber}
          isPlaying={play}
        />
      </div>
      <div className="ipod ipod-3">
        <IpodPlayer
          item={episodes[2]}
          setEpisodeNumber={setEpisodeNumber}
          episodes={episodes}
          episodeNumber={episodeNumber}
          isPlaying={play}
        />
      </div>
      <div className="blog blog-2">
        <Polaroid
          title={featuredBlogPosts[1] && featuredBlogPosts[1].title}
          type={featuredBlogPosts[1] && featuredBlogPosts[1].type}
          name={featuredBlogPosts[1] && featuredBlogPosts[1].author}
          date={featuredBlogPosts[1] && featuredBlogPosts[1].formattedDate}
          slug={featuredBlogPosts[1] && featuredBlogPosts[1].id}
          imagePath={"/BG-Images/BG-Image-1.png"}
          isHome={false}
        />
      </div>
      <div className="blog blog-3">
        <Polaroid
          title={featuredBlogPosts[2] && featuredBlogPosts[2].title}
          type={featuredBlogPosts[2] && featuredBlogPosts[2].type}
          name={featuredBlogPosts[2] && featuredBlogPosts[2].author}
          date={featuredBlogPosts[2] && featuredBlogPosts[2].formattedDate}
          slug={featuredBlogPosts[2] && featuredBlogPosts[2].id}
          imagePath={"/BG-Images/BG-Image-2.png"}
          isHome={false}
        />
      </div>
    </div>
  );
};

export default FeaturedBlogEpisodes;
