"use client";

import FeaturedBlock from "@/components/FeaturedBlock";
import RichContentBlock from "@/components/RichContentBlock";
import SearchBar from "@/components/SearchBar";
import React, { useState, useEffect } from "react";
import { auth, storage } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../firebase.js";
import { useParams } from "next/navigation";
import Image from "next/image";
import BlogPostImage from "@/components/BlogPostImage";

const blogPost = () => {
  const { postID } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [postData, setPostData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("")

const getPosts = async () => {
  let userRef;
  onAuthStateChanged(auth, async (user) => {
    userRef = user;
  });
  try {
    const docRef = doc(db, `/posts/`, postID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      console.log(docSnap.data());
      if (!docSnap.data().published && !userRef) {
        window.location.replace("/admin");
      }
      if (docSnap.data().imageID) {
        const storageRef = ref(storage, `posts/${docSnap.data().imageID}`);
        const url = await getDownloadURL(storageRef);
        data.imageURL = url;
      }
      const unixTimestamp = docSnap.data().date.seconds;
      const milliseconds = unixTimestamp * 1000;
      const dateObject = new Date(milliseconds);
      data.formattedDate =
        dateObject.getMonth() +
        1 +
        "/" +
        dateObject.getDate() +
        "/" +
        dateObject.getFullYear();
      setPostData(data);
    }
  } catch (err) {
    setError("Failed to load sources");
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getPosts();
  }, []);
  useEffect(() => {
    postData && setEditedContent(postData.content)
  }, [postData])

  const submitEdits = async () => {
    const docRef = doc(db, `/posts/`, postID);
    await updateDoc(docRef, {
      content: editedContent
    })
    setIsEditing(false)
    getPosts();
  }

  if (loading) return <div className="loading">Loading...</div>;
  if (!loading && !postData)
    return <div className="not-found">404 page not found</div>;

  return (
    <main className="blogPostPage">
      {/* <SearchBar type="blog" /> */}
      <div className="heading">
        <div className="title">{postData.title}</div>
        <div className="author">
          {postData.formattedDate} • {postData.author}
        </div>
      </div>
      {postData.imageID ? (
        <div>
          <BlogPostImage
            url={postData.imageURL}
            title={postData.title}
          />
          <div className="description">{postData.description}</div>
        </div>
      ) : (
        <>
        {(!postData.published && !isEditing) && (
          <button onClick={() => setIsEditing(true)}>make edits</button>
        )}
        {isEditing ? (
          <>
          <textarea name="content" id="" cols="100" rows="30" value={editedContent} onChange={(e) => setEditedContent(e.target.value)}></textarea>
          <button onClick={submitEdits}>submit</button>
          </>
        ) : (
          <RichContentBlock content={postData.content} />
          )}
        </>
      )}

      <div className="separator"></div>
      <div className="col-two">
        <FeaturedBlock
          title="My Life through the Years"
          type="story"
          quote="In spring, I shall love you! In summer, I shall weep for you;In autumn, I shall grow tall and sturdy Into a tree so evergreen;And I shall be your..."
          name="Kashika Barkakati"
          date="4/23/2020"
          readMore={true}
        />
        <FeaturedBlock
          title="Another Different Title"
          type="poem"
          quote="In spring, I shall love you! In summer, I shall weep for you;In autumn, I shall grow tall and sturdy Into a tree so evergreen;And I shall be your..."
          name="Theodore Chan"
          date="6/23/2023"
          readMore={true}
        />
        <FeaturedBlock
          title="Another Different Title"
          type="article"
          quote="In spring, I shall love you! In summer, I shall weep for you;In autumn, I shall grow tall and sturdy Into a tree so evergreen;And I shall be your..."
          name="Theodore Chan"
          date="6/23/2023"
          readMore={true}
        />
        <FeaturedBlock
          title="Another Different Title"
          type="poem"
          quote="In spring, I shall love you! In summer, I shall weep for you;In autumn, I shall grow tall and sturdy Into a tree so evergreen;And I shall be your..."
          name="Theodore Chan"
          date="6/23/2023"
          readMore={true}
        />
      </div>
    </main>
  );
};

export default blogPost;

// https://firebasestorage.googleapis.com/v0/b/this-teenage-life.appspot.com/o/posts%2F58e3a3fb-fece-4463-9896-c5259ece3cc0.jpeg?alt=media&token=c2752e20-8cd5-4e7b-8e67-1f426b69804f
// https://firebasestorage.googleapis.com/v0/b/this-teenage-life.appspot.com/o/posts%2F5ab0b9e3-9266-40ff-b9f3-6d80bd127c9c.jpeg?alt=media&token=d5be45b4-4e27-498a-a253-53daaa778ef6
