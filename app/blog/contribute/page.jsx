"use client";
import React, { useState, useEffect, useRef } from "react";
//firebase imports for adding doc
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebase.js";
import { storage } from "../../../firebase.js";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import { v4 as uuid } from "uuid";

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
    if (type == "drawing" || type == "photo") {
      if (
        author == "" ||
        email == "" ||
        title == "" ||
        image == "" ||
        description == ""
      ) {
        setSubmitConformation("fields");
        setTimeout(() => {
          setSubmitConformation("false");
        }, 3000);
        return;
      }
      try {
        setSubmitConformation("isLoading");

        //upload image to storage
        // generate unique id using
        let uniqueID = uuid();
        console.log(uniqueID);
        const storageRef = ref(storage, `posts/${uniqueID}`);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);

        const docRef = await addDoc(collection(db, "posts"), {
          author: author,
          email: email,
          title: title,
          searchTitle: title.toLowerCase().split(" "),
          imageID: uniqueID,
          imageURL: url,
          description: description,
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
        setDescription("");
        setImage("");
        setContent("");

        if (submitConformation != "error" && submitConformation != "fields") {
          console.log("submitted");
          setSubmitConformation("true");
        }

        // setTimeout(() => {
        //   setSubmitConformation("false");
        // }, 3000);
      }
    } else {
      if (author == "" || email == "" || title == "" || content == "") {
        setSubmitConformation("fields");
        setTimeout(() => {
          setSubmitConformation("false");
        }, 3000);
        return;
      }
      try {
        setSubmitConformation("isLoading");
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
          console.log("submitted");
          setSubmitConformation("true");
        }

        // setTimeout(() => {
        //   setSubmitConformation("false");
        // }, 3000);
      }
    }
  };

  // useEffect(() => {
  //   if (submitConformation == "true") {
  //     setAuthor("");
  //     setEmail("");
  //     setTitle("");
  //     setContent("");
  //   }
  // }, [submitConformation]);

  return (
    <main className="contributePage">
      <div className="create-blog">
        <h1 className="">Want to create your own blog post?</h1>
        <p>
          Welcome to the This Teenage Life blog! Here you can find all sorts of
          genres including (but not limited to!): short stories, poems, recipes,
          essays, and flash fiction, all written by teens for other young
          people. We are always accepting submissions from youth around the
          globe, and would love to see what you are working on. Guidelines for
          submission are below:
        </p>
        <ul>
          <li>
            Submissions must be no more than 500 words, or approximately 2 pages
            double spaced
          </li>
          <li>
            Work must be appropriate for all ages Original work only! Your
            submission cannot be previously published or released anywhere else
          </li>
          <li>All submissions must be sent through the submission portal!</li>
          <li>
            Pieces will be copy edited for clarity and spelling mistakes. If
            there are specific spelling choices made, please let us know when
            submitting!
          </li>
        </ul>
        <p style={{ marginBottom: "1.5rem" }}>
          If you have any questions, feel free to email us at
          team@thisteenagelife.org! Thank you!
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
          <div className="types-container types-container-large">
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
              : submitConformation == "isLoading"
              ? "Submitting..."
              : "Submission Failed"}
          </button>
        </form>
      </div>
      {console.log(submitConformation)}
      <dialog open={submitConformation == "true"} className="modal">
        <div className="modal-content">
          <h1>Congrats! 🎉</h1>
          <h2>You have succesfully submitted your blog post :)</h2>
          <p>Your post will now be reviewed for publishing</p>
          <div className="buttons">
            <button
              onClick={() => {
                setSubmitConformation("false");
                window.location.reload();
              }}
            >
              Submit Another!
            </button>
            {/* go home button */}
            <button
              onClick={() => {
                setSubmitConformation("false");
                window.location.href = "/blog";
              }}
            >
              Visit Blog
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default contribute;
