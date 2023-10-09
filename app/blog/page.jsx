"use client";

import BlogRow from "@/components/BlogRow";
import FeaturedBlock from "@/components/FeaturedBlock";
import Polaroids from "@/components/Polaroids";
import SearchBar from "@/components/SearchBar";
import React from "react";
import BlogImage from "@/components/BlogImage";
import TapeRow from "@/components/TapeRow";
import TapedPaper from "@/components/TapedPaper";
import { useState, useEffect } from "react";
import { db } from "../../firebase.js";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import Link from "next/link.js";

const blog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const collectionRef = collection(db, "/posts");
        const q = query(collectionRef, orderBy("date", "desc"));
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
        setPosts(tempArr);
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

  async function searchPosts(e) {
    e.preventDefault();
    try {
      console.log("searching...");
      const collectionRef = collection(db, "/posts");

      if (search) {
        const lowerCaseSearch = search.toLowerCase();
        const q = query(
          collectionRef,
          where("searchTitle", "array-contains", lowerCaseSearch),
          orderBy("date", "desc")
        );

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
        console.log(tempArr);
        // setPosts(tempArr);
      } else {
        // No search, default query
        const q = query(collectionRef, orderBy("date", "desc"));
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
        console.log(tempArr);
        // setPosts(tempArr);
      }
    } catch (err) {
      setError("Failed to load sources");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="blogPage">
      <div className="heading">
        <div className="tape-section"></div>
        TTL Blog: For Teens by Teens
        </div>
      <Polaroids featured={posts.filter((post) => post.featured == true)} />
      <SearchBar
        type="episode"
        search={search}
        setSearch={setSearch}
        submit={searchPosts}
        setIsSearching={setIsSearching}
      />
      {/* <div className="heading">Recents</div> */}
      <div className="big-left">
        <div>
          {posts
            .filter((post) => !post.featured && post.published)
            .map(
              (post, i) =>
                i <= 4 && (
                  <TapeRow
                    key={i}
                    title={post.title}
                    type={post.type}
                    name={post.author}
                    id={post.id}
                  />
                )
            )}
        </div>
        <TapedPaper />
      </div>
      <div className="big-right">
        <TapedPaper />
        <div>
          {posts
            .filter((post) => !post.featured && post.published)
            .map(
              (post, i) =>
                i > 4 &&
                i <= 9 && (
                  <TapeRow
                    key={i}
                    title={post.title}
                    type={post.type}
                    name={post.author}
                    id={post.id}
                  />
                )
            )}
        </div>
      </div>

      {posts
        .filter((post) => !post.featured && post.published)
        .map(
          (post, i) =>
            i > 9 && (
              <TapeRow
                key={i}
                title={post.title}
                type={post.type}
                name={post.author}
                id={post.id}
              />
            )
        )}

      <Link href="/blog/contribute">Wanna contribute to the blog?</Link>

      {/* <BlogRow
        title={"My Life Through The Seasons"}
        type={"poem"}
        name={"Kashika Barkakati"}
        date={"4/23/2020"}
        slug={"my-life-through-the-seasons"}
      />
      <BlogRow
        title={"My Life Through The Seasons"}
        type={"poem"}
        name={"Kashika Barkakati"}
        date={"4/23/2020"}
        slug={"my-life-through-the-seasons"}
      />
      <BlogRow
        title={"My Life Through The Seasons"}
        type={"poem"}
        name={"Kashika Barkakati"}
        date={"4/23/2020"}
        slug={"my-life-through-the-seasons"}
      />
      <div className="col-three">
        <BlogImage
          title={"My Life Throught the Seasons"}
          imagePath={"/TempPhoto.jpeg"}
          name={"Kashika Barkakati"}
          date={"4/23/2020"}
          slug={"my-life-through-the-seasons"}
        />
        <BlogImage
          title={"My Life Throught the Seasons"}
          imagePath={"/TempPhoto.jpeg"}
          name={"Kashika Barkakati"}
          date={"4/23/2020"}
          slug={"my-life-through-the-seasons"}
        />
        <BlogImage
          title={"My Life Throught the Seasons"}
          imagePath={"/TempPhoto.jpeg"}
          name={"Kashika Barkakati"}
          date={"4/23/2020"}
          slug={"my-life-through-the-seasons"}
        />
      </div>
      <BlogRow
        title={"My Life Through The Seasons"}
        type={"poem"}
        name={"Kashika Barkakati"}
        date={"4/23/2020"}
        slug={"my-life-through-the-seasons"}
      />
      <BlogRow
        title={"My Life Through The Seasons"}
        type={"poem"}
        name={"Kashika Barkakati"}
        date={"4/23/2020"}
        slug={"my-life-through-the-seasons"}
      />
      <BlogRow
        title={"My Life Through The Seasons"}
        type={"poem"}
        name={"Kashika Barkakati"}
        date={"4/23/2020"}
        slug={"my-life-through-the-seasons"}
      /> */}
    </main>
  );
};

export default blog;
