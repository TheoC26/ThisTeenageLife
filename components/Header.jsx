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
            priority={true}
          />
        </Link>
        <ul>
          <li>
            <Link className="link" href="/episodes">
              {/* Episodes */}
              <Image
                src="/navText/Episodes.png"
                width={50}
                height={50}
                alt="Episodes"
                priority={true}
              />
            </Link>
          </li>
          <li>
            <Link className="link" href="/blog">
              {/* Blog */}
              <Image
                src="/navText/Zine.png"
                width={50}
                height={50}
                alt="Blog"
                priority={true}
              />
            </Link>
          </li>
          <li>
            <Link className="link" href="/about">
              {/* About */}
              <Image
                src="/navText/About.png"
                width={50}
                height={50}
                alt="About"
                priority={true}
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
              Support
            </Link>
          </li> */}
        </ul>
      </div>
      
    </div>
  );
};

export default Header;
