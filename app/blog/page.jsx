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

const POSTS_PER_PAGE = 20;

const Blog = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [searchedPosts, setSearchedPosts, searchedPostsRef] = useStateRef([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage, currentPageRef] = useStateRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [firstDoc, setFirstDoc] = useState(null);
  const [hasMorePrevious, setHasMorePrevious] = useState(true);
  const [pageCache, setPageCache, pageCacheRef] = useStateRef({});

  const snailRef = useRef(null);
  const wannaContributeRef = useRef(null);

  // Fetch featured posts on initial load
  useEffect(() => {
    const getFeaturedPosts = async () => {
      try {
        const q = query(
          collection(db, "/posts"),
          where("featured", "==", true),
          where("published", "==", true)
        );
        const snapshot = await getDocs(q);
        const featuredDocs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          formattedDate: convertDateToFormattedDate(doc.data().date),
        }));
        setFeaturedPosts(featuredDocs);
      } catch (err) {
        console.error("Error fetching featured posts:", err);
      }
    };
    getFeaturedPosts();
  }, []);

  // Fetch posts with pagination
  const fetchPosts = async (direction = "forward", isNewPage = false) => {
    try {
      setLoading(true);
      let q;

      if (direction === "forward") {
        if (isNewPage && !lastDoc) {
          // First page of forward pagination
          q = query(
            collection(db, "/posts"),
            where("featured", "==", false),
            where("published", "==", true),
            orderBy("date", "desc"),
            limit(POSTS_PER_PAGE),
          );
        } else if (isNewPage && lastDoc) {
          // Subsequent pages of forward pagination
          q = query(
            collection(db, "/posts"),
            where("featured", "==", false),
            where("published", "==", true),
            orderBy("date", "desc"),
            startAfter(lastDoc),
            limit(POSTS_PER_PAGE),
          );
        }
      } else if (direction === "backward") {
        if (isNewPage && !firstDoc) {
          // First page of backward pagination
          q = query(
            collection(db, "/posts"),
            where("featured", "==", false),
            where("published", "==", true),
            orderBy("date", "desc"),
            limitToLast(POSTS_PER_PAGE)
          );
        } else if (isNewPage && firstDoc) {
          // Subsequent pages of backward pagination
          q = query(
            collection(db, "/posts"),
            where("featured", "==", false),
            where("published", "==", true),
            orderBy("date", "desc"),
            endBefore(firstDoc),
            limitToLast(POSTS_PER_PAGE)
          );
        }
      }

      const snapshot = await getDocs(q);

      // Update pagination state based on direction
      if (direction === "forward") {
        setHasMore(snapshot.docs.length === POSTS_PER_PAGE);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      } else if (direction === "backward") {
        setHasMorePrevious(snapshot.docs.length === POSTS_PER_PAGE);
        setFirstDoc(snapshot.docs[0]);
      }

      const newPosts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        formattedDate: convertDateToFormattedDate(doc.data().date),
      }));

      // Update posts based on direction
      // setPosts((prevPosts) =>
      //   direction === "forward"
      //     ? isNewPage
      //       ? newPosts
      //       : [...prevPosts, ...newPosts]
      //     : isNewPage
      //     ? newPosts
      //     : [...newPosts, ...prevPosts]
      // );
      setPosts(newPosts);

      setPageCache((prev) => ({
        ...prev,
        [currentPageRef.current]: newPosts,
      }));

    } catch (err) {
      setError("Failed to load posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts("forward", true);

    const snail = snailRef.current;
    const wannaContribute = wannaContributeRef.current;

    document.addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      snail.style.left = 20 + Math.sqrt(x) + "px";
      snail.style.bottom = 50 - Math.sqrt(y) + "px";

      if (x < 300 && y > window.innerHeight - 150) {
        wannaContribute.style.display = "unset";
      } else {
        wannaContribute.style.display = "none";
      }
    });
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (search.length > 0) {
      const timeout = setTimeout(() => {
        searchPosts();
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [search]);

  function convertDateToFormattedDate(date) {
    const unixTimestamp = date.seconds;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    return `${
      dateObject.getMonth() + 1
    }/${dateObject.getDate()}/${dateObject.getFullYear()}`;
  }

  const handlePageChange = async (newPage) => {
    // Check if the page is already in the cache
    if (pageCacheRef.current[newPage]) {
      // If cached, simply set the posts from the cache
      setPosts(pageCacheRef.current[newPage]);
      setCurrentPage(newPage);
      setHasMore(newPage < currentPage);
      window.scrollTo(0, 0);
      return;
    }

    const direction = newPage > currentPage ? "forward" : "backward";

    setCurrentPage(newPage);

    try {
      // Fetch posts with the appropriate direction
      await fetchPosts(direction, true);

      // After fetching, save the current posts to the page cache
      // setPageCache((prev) => ({
      //   ...prev,
      //   [newPage]: posts, // Assuming 'posts' is the state variable holding current posts
      // }));
    } catch (error) {
      console.error("Error fetching page:", error);
    }

    window.scrollTo(0, 0);
  };



  // Render pagination controls
  const PaginationControls = () => (
    <div className="pagination-controls">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        className="pagination-button"
      >
        Previous
      </button>
      <span className="current-page">Page {currentPage}</span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasMore || loading}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );

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
    if (e) e.preventDefault();
    try {
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
        setSearchedPosts(tempArr.filter((post) => post.published));
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

        setSearchedPosts(tempArr.filter((post) => post.published));
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
      <RandomDrawings />
      <Link href="/blog/contribute">
        <div className="contribute-snail" ref={snailRef}>
          <Image
            className="snail"
            src="/decoratives/snail.png"
            width={100}
            height={100}
            alt="Contribute snail"
          />
          <Image
            className="wanna-contribute"
            ref={wannaContributeRef}
            src="/decoratives/wannaContribute.png"
            width={100}
            height={100}
            alt="Wanna contribute?"
          />
        </div>
      </Link>

      <div className="heading">
        <div className="tape-section"></div>
        TTL Zine: For Teens by Teens
      </div>

      <Polaroids featured={featuredPosts} />

      <BlogSearchBar
        type="episode"
        search={search}
        setSearch={setSearch}
        submit={searchPosts}
        setIsSearching={setIsSearching}
        posts={searchedPosts.length > 0 && searchedPosts}
        showSearches={search.length > 0}
        isSearching={isSearching}
      />

      <div style={{ height: "20px" }}></div>

      {!isSearching && (
        <>
          <div
            className={
              posts.filter(
                (post) => post.type === "drawing" || post.type === "photo"
              ).length > 2 && "big-left"
            }
            style={{ width: "100%" }}
          >
            <div>
              {posts.slice(0, 5).map((post, i) => (
                <TapeRow
                  key={post.id}
                  title={post.title}
                  type={post.type}
                  name={post.author}
                  id={post.id}
                />
              ))}
            </div>
            {posts
              .filter(
                (post) => post.type === "drawing" || post.type === "photo"
              )
              .slice(0, 1)
              .map((post) => (
                <TapedPaper
                  key={post.id}
                  imageURL={post.imageURL}
                  title={post.title}
                  id={post.id}
                />
              ))}
          </div>

          <div
            className={
              posts.filter(
                (post) => post.type === "drawing" || post.type === "photo"
              ).length > 2 && "big-right"
            }
            style={{ width: "100%" }}
          >
            {posts
              .filter(
                (post) => post.type === "drawing" || post.type === "photo"
              )
              .slice(1, 2)
              .map((post) => (
                <TapedPaper
                  key={post.id}
                  imageURL={post.imageURL}
                  title={post.title}
                  id={post.id}
                />
              ))}
            <div>
              {posts.slice(5, 10).map((post, i) => (
                <TapeRow
                  key={post.id}
                  title={post.title}
                  type={post.type}
                  name={post.author}
                  id={post.id}
                />
              ))}
            </div>
          </div>

          {posts.slice(10).map((post) => (
            <TapeRow
              key={post.id}
              title={post.title}
              type={post.type}
              name={post.author}
              id={post.id}
            />
          ))}

          {!loading && <PaginationControls />}
          {loading && <div className="loading">Loading...</div>}
        </>
      )}
    </main>
  );
};

export default Blog;
