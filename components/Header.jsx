"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useScrollDirection from "@/hooks/scrollDirectionHook";

const Header = () => {
  const scrollDirection = useScrollDirection();

  return (
    <div className={`header ${scrollDirection === "down" && "disappear"}`}>
      <div className="inside">
        <Link href={"/"}>
          <Image
            className="logo"
            src="/logo.svg"
            alt="Logo"
            width={60}
            height={60}
          />
        </Link>
        <ul>
          <li>
            <Link className="link" href="/episodes">
              episodes
            </Link>
          </li>
          <li>
            <Link className="link" href="/blog">
              blog
            </Link>
          </li>
          <li>
            <Link className="link" href="/about">
              about
            </Link>
          </li>
          <li>
            <Link className="link" href="/recources">
              resources
            </Link>
          </li>
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
