import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="copywrite">© {new Date().getFullYear()} This Teenage Life</div>
      <div className="credit">
        Website by{" "}
        <Link
          href={"https://theodore-chan.com/"}
          target="_blank"
          className="font-bold"
        >
          Theodore Chan
        </Link>
      </div>

      <Image
        className="logo"
        src={"/LogoMouth.png"}
        alt="Logo"
        width={150}
        height={150}
      />
      <div className="categories">
        <div className="category">
          <div className="title">Socials</div>
          <Link href="mailto:team@thisteenagelife.org" className="link">
            Email
          </Link>
          <Link
            href="https://www.instagram.com/this.teenage.life/"
            className="link"
          >
            Instagram
          </Link>
          <Link href="https://pin.it/1kMKrSiRX" className="link">
            Pinterest
          </Link>
        </div>
        <div className="category">
          <div className="title">Links</div>
          <Link href="/" className="link">
            Home
          </Link>
          <Link href="/episodes" className="link">
            Episodes
          </Link>
          <Link href="/blog" className="link">
            Zine
          </Link>
          <Link href="/edresources" className="link">
            Educational Resources
          </Link>
          <Link href="/about" className="link">
            About
          </Link>
          <Link href="/contribute" className="link">
            Contribute
          </Link>
          {/* <Link href="#" className="link">
            recources
          </Link> */}
          {/* <Link href="#" className="link">
            merch
          </Link> */}
        </div>
        <div className="category">
          <div className="title">Contribute</div>
          <Link href="/blog/contribute" className="link">
            Create a blog post
          </Link>
          <Link href="/join" className="link">
            Join the team
          </Link>
          <Link
            href="mailto:team@thisteenagelife.org"
            className="link"
            target="_blank"
          >
            Send a message
          </Link>
          <Link
            href="https://donate.stripe.com/14kdUCc0HaAy9SEfYY"
            className="link"
            target="_blank"
          >
            Support our work
          </Link>
        </div>
        <div className="category">
          <div className="title">Listen</div>
          <Link href="#" className="link">
            View episodes
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
