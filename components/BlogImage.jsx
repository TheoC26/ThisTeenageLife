import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogImage = ({ title, imagePath, name, date, slug }) => {
  return (
    <Link href={`/blog/${slug}`} className="blogImage">
      <div className="blogImageContainer">
        <div className="imageContainer">
          <Image
            className="image"
            src={imagePath}
            alt={title}
            width={100}
            height={100}
          />
          <Image
            src={"/decoratives/sloppyRectRound.svg"}
            style={{ height: "103%", transform: "translateY(-5px)" }}
            alt="Drawn border"
            width={100}
            height={100}
            className="decorative"
          />
        </div>

        <div className="title">{title}</div>
        <div className="name">{name}</div>
        <div className="date">{date}</div>
        <Image
          src={"/decoratives/sloppyRectRound.svg"}
          style={{ height: "103%", transform: "translateY(-5px)" }}
          alt="Drawn border"
          width={100}
          height={100}
          className="decorative"
        />
      </div>
    </Link>
  );
};

export default BlogImage;
