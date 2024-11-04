"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useScrollDirection from "@/hooks/scrollDirectionHook";

const Header = () => {
  const scrollDirection = useScrollDirection();

  return (
    <div className={`header ${scrollDirection === "down" && ""}`}>
      <div className="inside">
        <Link href={"/"}>
          <Image
            className="logo"
            src="/Logo.svg"
            alt="Logo"
            width={60}
            height={60}
          />
        </Link>
        <ul>
          <li>
            <Link className="link" href="/episodes">
              {/* Episodes */}
              <Image
                src="/navText/Episodes.png"
                width={100}
                height={100}
                alt="Episodes"
              />
            </Link>
          </li>
          <li>
            <Link className="link" href="/blog">
              {/* Blog */}
              <Image
                src="/navText/Zine.png"
                width={100}
                height={100}
                alt="Blog"
              />
            </Link>
          </li>
          <li>
            <Link className="link" href="/about">
              {/* About */}
              <Image
                src="/navText/About.png"
                width={100}
                height={100}
                alt="About"
              />
            </Link>
          </li>
          {/* <li>
            <Link className="link" href="/recources">
              resources
            </Link>
          </li> */}
          {/* <li>
            <Link className="link" href="#">
              merch
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
