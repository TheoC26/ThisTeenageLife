import Link from "next/link";
import React from "react";

const TapeRow = ({ title, type, name, id }) => {
  return (
    <Link
      href={`/blog/${id}`}
      className="tapeRow"
      style={{
        transform:
          "rotate(" +
          (Math.random() * 3 - 1.5) +
          "deg) translateX(" +
          (Math.random() * 40 - 20) +
          "px)",
        width: Math.random() * 10 + 95 + "%",
      }}
    >
      <div className="title">{title.slice(0, 40)}{title.length > 35 && "..."}</div>
      <div className="type-name">
        {type} • {name}
      </div>
    </Link>
  );
};

export default TapeRow;
