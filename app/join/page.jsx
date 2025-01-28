"use client";
import React, { useState, useEffect, useRef } from "react";
//firebase imports for adding doc
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { storage } from "../../firebase.js";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";

import { v4 as uuid } from "uuid";

// import CustomEditor, { Editor } from "@/components/CustomEditor.jsx";
import Editor from "@/components/CustomEditor.jsx";
import RandomDrawings from "@/components/RandomDrawings.jsx";

const contribute = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countrystate, setCountrystate] = useState("");
  const [content, setContent] = useState("");
  const [discovery, setDiscovery] = useState("");
  const [age, setAge] = useState("");
  const [submitConformation, setSubmitConformation] = useState("false");

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
      if (name == "" || email == "" || countrystate == "" || content == "" || discovery == "" || age == "") {
        setSubmitConformation("fields");
        setTimeout(() => {
          setSubmitConformation("false");
        }, 3000);
        return;
      }
      try {
        setSubmitConformation("isLoading");
        const docRef = await addDoc(collection(db, "applications"), {
          name,
          email,
          countrystate,
          content,
          discovery,
          age,
          date: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
        setSubmitConformation("error");
      } finally {
        setName("");
        setEmail("");
        setContent("");
        setCountrystate("");


        if (submitConformation != "error" && submitConformation != "fields") {
          setSubmitConformation("true");
        }

      }
    
  };


  return (
    <main className="contributeBlogPage">
        <RandomDrawings />
      <div className="create-blog">
        <h1 className="">Want to join a TTL dialogue group?</h1>
        <p>
          We would love to hear your voice! Fill out this short application and
          we will reach out to you shortly with more information!
        </p>
        <p style={{ marginBottom: "1.5rem" }}>
          If you have any questions, feel free to email us at
          team@thisteenagelife.org! Thank you!
        </p>
        <form onSubmit={handleApplicationSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="country/state"
            id="countrystate"
            placeholder="Country/State..."
            value={countrystate}
            onChange={(e) => setCountrystate(e.target.value)}
          />
          <input
            type="number"
            name="age"
            id="age"
            placeholder="Age..."
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <input
            type="text"
            name="discovery"
            id="discovery"
            placeholder="How you came across TTL..."
            value={discovery}
            onChange={(e) => setDiscovery(e.target.value)}
          />
            <p>What resonates with you about This Teenage Life? Do you have any ideas for episodes you may want to contribute to? (150+ words)</p>
          <div className="lexicalEditor">
            <Editor setContent={setContent} />
          </div>

          <div className="terms">
            By submitting you are agreeing to the{" "}
            <span>terms and conditions</span>
          </div>
          <button type="submit" className={submitConformation}>
            {submitConformation == "true"
              ? "Sent!"
              : submitConformation == "false"
              ? "Send Application"
              : submitConformation == "fields"
              ? "Fill out all Fields"
              : submitConformation == "isLoading"
              ? "Sending..."
              : "Submission Failed"}
          </button>
        </form>
      </div>
      {console.log(submitConformation)}
      <dialog open={submitConformation == "true"} className="modal">
        <div className="modal-content">
          <h1>Congrats! 🎉</h1>
          <h2>Your submission was successful :)</h2>
          <p>We will reach out to you with more information soon!</p>
          <div className="buttons">
            <button
              onClick={() => {
                setSubmitConformation("false");
                window.location.reload();
              }}
            >
              Go Back!
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
