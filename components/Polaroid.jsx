import Image from "next/image";
import Link from "next/link";
import React from "react";

const Polaroid = ({ title, type, name, date, slug, imagePath }) => {
  return (
    <Link href={`/blog/${slug}`} style={{ textDecoration: "none" }}>
      <div className="polaroid">
        {/* <div className="tape-section"></div> */}
        <div className="type">{type}</div>
        <div className="imagecontainer">
          <Image
            className="image"
            src={imagePath}
            alt={title}
            width={100}
            height={100}
          />
        </div>

        <div className="title">{title}</div>
        <div className="author">{name}</div>
        <div className="date">{date}</div>
      </div>
    </Link>
  );
};

export default Polaroid;
