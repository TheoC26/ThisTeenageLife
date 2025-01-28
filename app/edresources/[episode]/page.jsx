"use client";
import RandomDrawings from "@/components/RandomDrawings";
import RichContentBlock from "@/components/RichContentBlock";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase.js";

const EducationalResourcePage = () => {
  const { episode } = useParams();
  // episode name should be the episode name from the url but with spaces instead of %20 and and : instead of %3A
  const [episodeName, setEpisodeName] = useState(
    episode.replace(/%20/g, " ").replace(/%3A/g, ":")
  );
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    const getPost = async () => {
      try {
        // query the database for the post with the name of the episode where the "episodeName" field is equal to the episodeName state
        const q = query(
          collection(db, "educationalResources"),
          where("episodeName", "==", episodeName)
        );
        const docSnap = await getDocs(q);

        if (docSnap.empty) {
          console.log("No such document!");
          return;
        }
        docSnap.forEach((doc) => {
          setPostContent(doc.data().content);
        });
      } catch (e) {
        console.error("Error getting document:", e);
      }
    };

    getPost();
  }, []);

  return (
    <main className="blogPostPage">
      <RandomDrawings />
      {/* <SearchBar type="blog" /> */}
      <div className="heading">
        <div className="title">Educational Resource</div>
        <div className="author">{episodeName}</div>
      </div>
      <div className="separator" style={{ width: "50%" }}></div>

      <RichContentBlock
        content={postContent}
      />
    </main>
  );
};

export default EducationalResourcePage;
