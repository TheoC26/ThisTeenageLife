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
          <Link href="mailto:team@thisteenagelife.org" className="link">
            Email
          </Link>
          <Link
            href="https://www.instagram.com/this.teenage.life/"
            className="link"
          >
            Intagram
          </Link>
        </div>
        <div className="category">
          <div className="title">links</div>
          <Link href="/" className="link">
            home
          </Link>
          <Link href="/episodes" className="link">
            episodes
          </Link>
          <Link href="/blog" className="link">
            blog
          </Link>
          <Link href="/about" className="link">
            about
          </Link>
          {/* <Link href="#" className="link">
            recources
          </Link> */}
          {/* <Link href="#" className="link">
            merch
          </Link> */}
        </div>
        <div className="category">
          <div className="title">contribute</div>
          <Link href="/blog/contribute" className="link">
            create a blog post
          </Link>
          <Link href="mailto:team@thisteenagelife.org" className="link">
            join the team
          </Link>
          <Link href="mailto:team@thisteenagelife.org" className="link">
            send a message
          </Link>
          <Link
            href="https://buymeacoffee.com/thisteenagelife"
            className="link"
          >
            support our work
          </Link>
        </div>
        <div className="category">
          <div className="title">listen</div>
          <Link href="#" className="link">
            view episodes
          </Link>
          <Link
            href="https://podcasts.apple.com/us/podcast/this-teenage-life/id1456067511"
            className="apple-pod link"
          >
            Apple Podcasts
          </Link>
          <Link
            href="https://open.spotify.com/show/2YGaei3I55DO2I7FsRUd5h?si=91598de4562a4fcf"
            className="spotify link"
          >
            Spotify
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
