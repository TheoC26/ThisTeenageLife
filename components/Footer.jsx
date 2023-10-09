import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <Image
        className="logo"
        src={"/LogoMouth.png"}
        alt="Logo"
        width={150}
        height={150}
      />
      <div className="categories">
        <div className="category">
          <div className="title">contact</div>
          <Link href="#" className="link">
            Email
          </Link>
          <Link href="#" className="link">
            Intagram
          </Link>
        </div>
        <div className="category">
          <div className="title">links</div>
          <Link href="#" className="link">
            home
          </Link>
          <Link href="#" className="link">
            episodes
          </Link>
          <Link href="#" className="link">
            blog
          </Link>
          <Link href="#" className="link">
            about
          </Link>
          <Link href="#" className="link">
            recources
          </Link>
          {/* <Link href="#" className="link">
            merch
          </Link> */}
        </div>
        <div className="category">
          <div className="title">contribute</div>
          <Link href="#" className="link">
            create a blog post
          </Link>
          <Link href="#" className="link">
            join the team
          </Link>
          <Link href="#" className="link">
            send a message
          </Link>
        </div>
        <div className="category">
          <div className="title">listen</div>
          <Link href="#" className="link">
            view episodes
          </Link>
          <Link href="#" className="apple-pod">
            Apple Podcasts
          </Link>
          <Link href="#" className="spotify">
            spotify
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
