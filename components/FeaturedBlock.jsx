import React from "react";
import Image from "next/image";
import Link from "next/link";

const FeaturedBlock = ({ title, type, quote, name, date, url, readMore }) => {
  return (
    <div className="featureblock">
      <div className="leftside">
        <div className="title">{title}</div>
        <div className="type">{type}</div>
        {/* <Image
          className="decorative"
          style={{ height: "12rem" }}
          src="/decoratives/sloppyRectRound.svg"
          alt="Drawn border"
          width={100}
          height={100}
        /> */}
      </div>
      <div className="rightside">
        <div className="quote">{quote}</div>
        <div className="name">{name}</div>
        <div className="date">{date}</div>
      </div>
      {readMore === true && <Link href={url} className="read">read →</Link>}

      {/* <Image
        className="decorative"
        style={{ height: "15rem" }}
        src="/decoratives/sloppyRectRound.svg"
        alt="Drawn border"
        width={100}
        height={100}
      /> */}
    </div>
  );
};

export default FeaturedBlock;
