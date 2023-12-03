"use client";
import React, { useState, useEffect } from "react";
//firebase imports for adding doc
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";
// import CustomEditor, { Editor } from "@/components/CustomEditor.jsx";
import Editor from "@/components/CustomEditor.jsx";

const contribute = () => {
  const [author, setAuthor] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [type, setType] = useState("poem");
  const [submitConformation, setSubmitConformation] = useState("false");


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (author == "" || email == "" || title == "" || content == "") {
      setSubmitConformation("fields");
      setTimeout(() => {
        setSubmitConformation("false");
      }, 3000);
      return;
    };
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        author: author,
        email: email,
        title: title,
        searchTitle: title.toLowerCase().split(" "),
        content: content,
        type: type,
        featured: false,
        published: false,
        date: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      setSubmitConformation("error");

    } finally {
      setAuthor("");
      setEmail("");
      setTitle("");
      setContent("");

      if (submitConformation != "error" && submitConformation != "fields") {
        console.log("submitted")
        setSubmitConformation("true");
      }
      
      setTimeout(() => {
        setSubmitConformation("false");
      }, 3000);
    }
  };

  return (
    <main className="contributePage">
      <div className="create-blog">
        <h1 className="">Want to create your own blog post?</h1>
        <p>
          This Teenage Life was founded and is run by a team of inspiring
          teenagers and an adult named Molly Josephs. They came together while
          Molly was working at a project-based high school called High Tech High
          in San Diego, California. Molly has spent the past decade teaching
          middle and high school biology and computer science, and designing
          project-based curricula. Since studying biology at Brown University
          and school leadership at Harvard’s Graduate School of Education, she’s
          worked in independent, public district, and public charter schools
          including High Tech High, The Dalton School, Codman Academy, and The
          Healey School. She also spent three years on a team working to start a
          new kind of in-district, project-based high school called Powderhouse
          Studios.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name..."
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="types-container">
            <input
              type="radio"
              id="types-1"
              name="types"
              onChange={() => setType("poem")}
            />
            <label className="type" for="types-1">
              Poem
            </label>
            <input
              type="radio"
              id="types-2"
              name="types"
              onChange={() => setType("story")}
            />
            <label className="type" for="types-2">
              Story
            </label>
            <input
              type="radio"
              id="types-3"
              name="types"
              onChange={() => setType("article")}
            />
            <label className="type" for="types-3">
              Article
            </label>
            <input
              type="radio"
              id="types-4"
              name="types"
              onChange={() => setType("drawing")}
            />
            <label className="type" for="types-4">
              Drawing
            </label>
            <input
              type="radio"
              id="types-5"
              name="types"
              onChange={() => setType("photo")}
            />
            <label className="type" for="types-5">
              Photo
            </label>
            <input
              type="radio"
              id="types-6"
              name="types"
              onChange={() => setType("reflection")}
            />
            <label className="type" for="types-6">
              Reflection
            </label>
            <span className="glider"></span>
          </div>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {(type == "poem" || type == "story" || type == "article") && (
            <>
              <div className="lexicalEditor">
                <Editor setContent={setContent} />
              </div>
              {/* <textarea
                name="content"
                id="content"
                cols="30"
                rows="30"
                placeholder="Start Writing Here..."
                value={content}
                style={{ resize: "none" }}
                onChange={(e) => setContent(e.target.value)}
              ></textarea> */}
            </>
          )}
          {(type == "drawing" || type == "photo") && (
            <>
              <input
                type="file"
                name="file"
                id="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
              <textarea
                name="content"
                id="content"
                cols="30"
                rows="10"
                placeholder="Description..."
                value={description}
                style={{ resize: "none" }}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </>
          )}

          <div className="terms">
            By submitting you are agreeing to the{" "}
            <span>terms and conditions</span>
          </div>
          <button type="submit" className={submitConformation}>
            {submitConformation == "true"
              ? "Submitted for Review"
              : submitConformation == "false"
              ? "Submit For Review"
              : submitConformation == "fields"
              ? "Fill out all Fields"
              : "Submission Failed"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default contribute;
