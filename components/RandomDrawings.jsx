"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

function createDrawingsArray(numberOfDrawings) {
  let drawings = [];
  for (let i = 0; i < numberOfDrawings; i++) {
    drawings.push("BG-Image-" + Math.floor(Math.random() * 10) + ".png");
  }
  return drawings;
}

function doesArrayHaveDuplicates(array) {
    return new Set(array).size !== array.length;
}

const RandomDrawings = () => {
  const [drawings, setDrawings] = useState([]);
   const [height, setHeight] = useState("");
  useEffect(() => {
    const numberOfDrawings = Math.round(
      document.body.offsetHeight / (window.innerHeight / 2)
    );
    let drawings = createDrawingsArray(numberOfDrawings);
    while (doesArrayHaveDuplicates(drawings)) {
        drawings = createDrawingsArray(numberOfDrawings);
    }
    setDrawings(drawings);
    if (typeof document !== "undefined") {
      const newHeight =
        document.body.offsetHeight > window.innerHeight
          ? document.body.offsetHeight + "px"
          : window.innerHeight + "px";
      setHeight(newHeight);
    }
  }, []);

  return (
    <div
      className="randomDrawings"
      style={{
        height: height
      }}
    >
      {drawings.map((drawing, i) => (
        <Image
          key={i}
          className={`BG-Image ${i % 2 === 0 ? "left" : "right"}`}
          style={{
            top: i * (window.innerHeight / 3) + Math.random() * 150 - 80 + "px",
          }}
          src={`/BG-Images/${drawing}`}
          alt="Random drawing"
          width={100}
          height={100}
        />
      ))}
    </div>
  );
};

export default RandomDrawings;
