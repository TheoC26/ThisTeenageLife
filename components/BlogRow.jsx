import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogRow = ({ title, type, name, date, slug }) => {
  return (
    <Link href={`/blog/${slug}`} className="blogrow">
      <div className="left">
        <div className="title">{title}</div>
        <div className="type">{type}</div>
      </div>
      <div className="right">
        <div className="name">{name}</div>
        <div className="date">{date}</div>
      </div>
      <Image
        className="decorative"
        style={{ height: "5rem" }}
        src="/decoratives/sloppyLongRectRound.svg"
        alt="Drawn border"
        width={100}
        height={100}
      />
    </Link>
  );
};

export default BlogRow;
