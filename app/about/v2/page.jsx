"use client";
import Image from "next/image";
import React, {useState, useEffect} from "react";
import {db} from "../../../firebase";
import {collection, getDocs, query} from "firebase/firestore";


const people = [
  {
    name: "John Doe",
    birthYear: 2005,
    country: "United States",
    xPercent: 0.4,
    yPercent: 0.5,
  },
  {
    name: "Jane Doe",
    birthYear: 2008,
    country: "United States",
    xPercent: 0.6,
    yPercent: 0.3,
  },
  {
    name: "Joe momma",
    birthYear: 2006,
    country: "United States",
    xPercent: 0.7,
    yPercent: 0.1,
  },
];

const getAge = (birthYear) => {
  return new Date().getFullYear() - birthYear;
}

const about = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
     const getTeamMembers = async () => {
      try {
        const collectionRef = collection(db, "/teamMembers");
        const q = query(collectionRef);
        const docSnap = await getDocs(q);
        var tempArr = [];
        docSnap.forEach((doc) => {
          tempArr.push(Object.assign(doc.data(), { id: doc.id }));
        });
        console.log(tempArr)
        setTeamMembers(tempArr);
      } catch (err) {
        setError("Failed to load sources");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getTeamMembers();
  }, []);

  return (
    <main className="aboutPage">
      <div>about</div>
      <div>new update</div>
      <div className="worldMap">
        {teamMembers.map((person) => (
          <div
            className="person"
            style={{
              left: person.xPercent + "%",
              top: person.yPercent + "%",
            }}
          >
          </div>
        ))}
        <Image
          src={"/world.svg"}
          className="worldImage"
          alt="world"
          width={100}
          height={100}
        />
      </div>
      <div>change1</div>
    </main>
  );
};

export default about;
