"use client";

import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";
import Image from "next/image";

const admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [adminPage, setAdminPage] = useState(1);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberCountry, setNewMemberCountry] = useState("");
  const [newMemberBirthYear, setNewMemberBirthYear] = useState("");

  const [xPercent, setXPercent] = useState(50);
  const [yPercent, setYPercent] = useState(50);
  const personMarkerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
    });

  }, []);
  useEffect(() => {
    const getPosts = async () => {
      try {
        const collectionRef = collection(db, "/posts");
        const q = query(collectionRef, orderBy("date", "desc"));
        const docSnap = await getDocs(q);
        var tempArr = [];
        docSnap.forEach((doc) => {
          tempArr.push(Object.assign(doc.data(), { id: doc.id }));
        });
        setPosts(tempArr);
      } catch (err) {
        setError("Failed to load sources");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    const getTeamMembers = async () => {
      try {
        const collectionRef = collection(db, "/teamMembers");
        const q = query(collectionRef);
        const docSnap = await getDocs(q);
        var tempArr = [];
        docSnap.forEach((doc) => {
          tempArr.push(Object.assign(doc.data(), { id: doc.id }));
        });
        setTeamMembers(tempArr);
      } catch (err) {
        setError("Failed to load sources");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) {
      getPosts();
      getTeamMembers();
    }
  }, [currentUser]);
  useEffect(() => {
    if (personMarkerRef.current) {
      // add a listener for personMarkerRef.current for click and then drag and drop for xPercent and yPercent of the image
      personMarkerRef.current.addEventListener("mousedown", (e) => {
        console.log("mousedown!");
        const mouseMove = (e) => {
          const mapRect = mapRef.current.getBoundingClientRect();
          const xPercent = (e.clientX - mapRect.left) / mapRect.width;
          const yPercent = (e.clientY - mapRect.top) / mapRect.height;
          setXPercent(xPercent * 100);
          setYPercent(yPercent * 100);
        };
        const mouseUp = (e) => {
          document.removeEventListener("mousemove", mouseMove);
          document.removeEventListener("mouseup", mouseUp);
        };
        document.addEventListener("mousemove", mouseMove);
        document.addEventListener("mouseup", mouseUp);
      });
    }
  }, [adminPage]);

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }

  async function updatePublished(id, published) {
    console.log(id, published);
    const postIndex = posts.findIndex((post) => post.id === id);
    const tempPosts = posts;
    tempPosts[postIndex].published = published;
    setPosts([...tempPosts]);
    const docRef = doc(db, `/posts`, id);
    await updateDoc(docRef, {
      published: published,
    });
  }
  async function updateFeatured(id, featured) {
    console.log(id, featured);
    const postIndex = posts.findIndex((post) => post.id === id);
    const tempPosts = posts;
    tempPosts[postIndex].featured = featured;
    setPosts([...tempPosts]);
    const docRef = doc(db, `/posts`, id);
    await updateDoc(docRef, {
      featured: featured,
    });
  }
  async function deletePost(id) {
    const postIndex = posts.findIndex((post) => post.id === id);
    const tempPosts = posts;
    tempPosts.splice(postIndex, 1);
    setPosts([...tempPosts]);
    const docRef = doc(db, `/posts`, id);
    await deleteDoc(docRef);
  }
  async function deleteTeamMember(id) {
    const teamMemberIndex = teamMembers.findIndex(
      (teamMember) => teamMember.id === id
    );
    const tempTeamMembers = teamMembers;
    tempTeamMembers.splice(teamMemberIndex, 1);
    setTeamMembers([...tempTeamMembers]);
    const docRef = doc(db, `/teamMembers`, id);
    await deleteDoc(docRef);
  }

  const getAge = (birthYear) => {
    return new Date().getFullYear() - birthYear;
  };



  return (
    <main className="adminPage">
      {currentUser ? (
        <>
          <button
            onClick={logout}
            style={{ backgroundColor: "#f094a4", alignSelf: "end" }}
          >
            Log Out
          </button>
          <h1>Admin Page</h1>
          <div className="adminPage-container">
            <input
              type="radio"
              id="adminPages-1"
              name="adminPages"
              onChange={() => setAdminPage(1)}
            />
            <label className="adminPage" for="adminPages-1">
              blog
            </label>
            <input
              type="radio"
              id="adminPages-2"
              name="adminPages"
              onChange={() => setAdminPage(2)}
            />
            <label className="adminPage" for="adminPages-2">
              team
            </label>
            <span className="glider"></span>
          </div>

          {adminPage == 1 ? (
            <div className="all-posts">
              <h2>Featured</h2>
              {posts.map(
                (post) =>
                  post.featured && (
                    <div className="post">
                      <div>{post.title}</div>
                      <div className="right-side">
                        <div>
                          {post.published ? "published" : "not published"}
                        </div>
                        <button>
                          <Link href={`/blog/${post.id}`}>view post</Link>
                        </button>
                        <button onClick={() => updateFeatured(post.id, false)}>
                          un-feature
                        </button>
                        <div>{post.type}</div>
                      </div>
                    </div>
                  )
              )}
              <h2>Published</h2>
              {posts.map(
                (post) =>
                  post.published &&
                  !post.featured && (
                    <div className="post">
                      <div>{post.title}</div>
                      <div className="right-side">
                        <button>
                          <Link href={`/blog/${post.id}`}>view post</Link>
                        </button>

                        <button onClick={() => updatePublished(post.id, false)}>
                          un-publish
                        </button>

                        <button onClick={() => updateFeatured(post.id, true)}>
                          feature
                        </button>
                        <div>{post.type}</div>
                      </div>
                    </div>
                  )
              )}
              <h2>Not Published</h2>
              {posts.map(
                (post) =>
                  !post.published &&
                  !post.featured && (
                    <div className="post">
                      <div>{post.title}</div>
                      <div className="right-side">
                        <button>
                          <Link href={`/blog/${post.id}`}>view post</Link>
                        </button>
                        <button onClick={() => updatePublished(post.id, true)}>
                          publish
                        </button>
                        <button
                          onClick={() => deletePost(post.id)}
                          style={{ backgroundColor: "#f094a4" }}
                        >
                          delete
                        </button>
                        <div>{post.type}</div>
                      </div>
                    </div>
                  )
              )}
            </div>
          ) : (
            adminPage == 2 && (
              <div className="all-team">
                <h2>Team Members</h2>
                <div className="team-members">
                  {teamMembers.map((member) => (
                    <div className="team-member">
                      <div>
                        {member.name} • {getAge(member.birthYear)} •{" "}
                        {member.country}
                      </div>
                      <div className="right-side">
                        <button onClick={() => deleteTeamMember(member.id)}>
                          delete member
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <h2
                  style={{
                    textAlign: "center",
                    marginTop: "3rem",
                    marginBottom: "1rem",
                  }}
                >
                  Add Member
                </h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    console.log("running!");
                    try {
                      console.log("trying!");
                      const docRef = await addDoc(
                        collection(db, "/teamMembers/"),
                        {
                          name: newMemberName,
                          country: newMemberCountry,
                          birthYear: newMemberBirthYear,
                          xPercent: xPercent,
                          yPercent: yPercent,
                        }
                      );
                      console.log("Document written with ID: ", docRef.id);
                    } catch (e) {
                      console.error("Error adding document: ", e);
                    } finally {
                      setNewMemberName("");
                      setNewMemberCountry("");
                      setNewMemberBirthYear("");
                    }
                  }}
                  className="add-member-form"
                >
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="name..."
                  />
                  <input
                    type="text"
                    value={newMemberCountry}
                    onChange={(e) => setNewMemberCountry(e.target.value)}
                    placeholder="country..."
                  />
                  <input
                    type="number"
                    value={newMemberBirthYear}
                    onChange={(e) => setNewMemberBirthYear(e.target.value)}
                    placeholder="birth year..."
                  />

                  <button type="submit">add member</button>
                </form>
                <div className="worldMap">
                  <div
                    className="personMarker"
                    ref={personMarkerRef}
                    style={{ left: xPercent + "%", top: yPercent + "%" }}
                  ></div>
                  <Image
                    src={"/world.svg"}
                    className="worldImage"
                    ref={mapRef}
                    alt="world"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            )
          )}
        </>
      ) : (
        <div className="login">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login(email, password)
                .then((userCredential) => {
                  const user = userCredential.user;
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setError(errorMessage);
                });
            }}
          >
            <input
              type="email"
              value={email}
              placeholder="email..."
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Log In</button>
          </form>
          {error && <p>{error}</p>}
        </div>
      )}
    </main>
  );
};

export default admin;
