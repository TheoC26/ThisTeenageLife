"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useScrollDirection from "@/hooks/scrollDirectionHook";

const Header = () => {
  const scrollDirection = useScrollDirection();

  const [isOpen, setIsOpen] = useState(false);

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
        <div className="hamberger" onClick={() => setIsOpen(!isOpen)}>
          <span className={`line1`}></span>
          <span className={`line2`}></span>
          <span className={`line3`}></span>
        </div>
      </div>
      <div className={`mobileMenu ${isOpen && "open"}`}>
        <div className="close" onClick={() => setIsOpen(!isOpen)}>
          <span className={`line1`}></span>
          <span className={`line2`}></span>
        </div>
        <div className="insideMobile">
          {/* <Link href={"/"} onClick={() => setIsOpen(false)}>
            <Image
              className="logo"
              src="/Logo.svg"
              alt="Logo"
              width={60}
              height={60}
              priority={true}
            />
          </Link> */}
          <ul>
            <li>
              <Link
                className="link"
                href="/episodes"
                onClick={() => setIsOpen(false)}
              >
                {/* Episodes */}
                <Image
                  src="/navText/Episodes.png"
                  width={100}
                  height={100}
                  alt="Episodes"
                  priority={true}
                />
              </Link>
            </li>
            <li>
              <Link
                className="link"
                href="/blog"
                onClick={() => setIsOpen(false)}
              >
                {/* Blog */}
                <Image
                  src="/navText/Zine.png"
                  width={100}
                  height={100}
                  alt="Blog"
                  priority={true}
                />
              </Link>
            </li>
            <li>
              <Link
                className="link"
                href="/about"
                onClick={() => setIsOpen(false)}
              >
                {/* About */}
                <Image
                  src="/navText/About.png"
                  width={100}
                  height={100}
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
    </div>
  );
};

export default Header;
