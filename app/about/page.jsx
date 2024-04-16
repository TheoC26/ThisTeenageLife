import FeaturedBlock from "@/components/FeaturedBlock";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="aboutPageV2">
      {/* <RandomDrawings /> */}
      {/* <TopMediaPlayer item={episodes[0]} autoPlay={false} page={"home"} /> */}

      <h2>
        <Image src="/navText/aboutus.png" width={300} height={50} />
      </h2>
      <center>
        <div className="video">
          <Image
            src="/decoratives/TV_under.png"
            className="under"
            width={1000}
            height={1000}
          />
          <video src="/placeholdervid.mp4" controls></video>
          <Image
            src="/decoratives/TV_over.png"
            className="over"
            width={1000}
            height={1000}
          />
        </div>

        <div className="text">
          It can be easy to think "I'm the only one with this issue," but
          hearing other young people share their experiences can normalize
          conversations around sensitive subjects and make the world feel less
          lonely, less big, and a little more loving.
          <br /> - Cloe Moreno
        </div>
      </center>

      {/* <div className="testimonial">
        <div className="quote">
          It can be easy to think "I'm the only one with this issue," but
          hearing other young people share their experiences can normalize
          conversations around sensitive subjects and make the world feel less
          lonely, less big, and a little more loving.{" "}
        </div>
        <div className="author">
          — Cloe Moreno, This Teenage Life artist and contributor
        </div>
      </div> */}

      <h1>Partnerships</h1>
      <center>
        <div className="partnercontainer">
          <Link href="https://www.asu.edu/" className="partner">
            Arizona State University
          </Link>
          <Link
            href="https://www.brown.edu/academics/college/swearer/"
            className="partner"
          >
            Brown University's Swearer Center
          </Link>

          <Link
            href="https://digitalthriving.gse.harvard.edu/"
            className="partner"
          >
            Center for Digital Thriving
          </Link>
          <Link
            href="https://connectedwellbeing.org/impact-studio/"
            className="partner"
          >
            Connected Wellbeing Impact Studio
          </Link>
          <Link
            href="https://www.headstreaminnovation.com/"
            className="partner"
          >
            Headstream
          </Link>
          <Link href="https://www.unicefusa.org/" className="partner">
            UNICEF USA
          </Link>
          <Link href="https://xqsuperschool.org/" className="partner">
            XQ Institute
          </Link>
        </div>

        <h1>Media Features</h1>
        <div className="partnercontainer">
          <Link
            href="https://www.brownalumnimagazine.com/articles/2024-03-15/are-the-kids-alright-molly-josephs-%E2%80%9909-this-teenage-life"
            className="partner"
          >
            Brown Alumni Magazine
          </Link>
          <Link href="" className="partner">
            American Academy of Pediatrics
          </Link>

          <Link
            href="https://www.teenvogue.com/story/how-podcasting-helped-me-cope-with-pandemic-loneliness"
            className="partner"
          >
            Teen Vogue on Teen Lonliness
          </Link>
          <Link
            href="https://www.teenvogue.com/story/how-podcasting-helped-me-cope-with-pandemic-loneliness"
            className="partner"
          >
            Teen Vogue on the Pandemic
          </Link>
          <Link
            href="https://facingtoday.facinghistory.org/facing-reality-themselves"
            className="partner"
          >
            Facing History and Ourselves
          </Link>
          <Link
            href="https://www.edutopia.org/profile/molly-josephs/"
            className="partner"
          >
            Edutopia
          </Link>
        </div>
      </center>

      {/* <h2 style={{ marginTop: "3rem" }}>
        Teen Team ✨<div className="tape-section"></div>
      </h2>
      <div className="full-team-img">
        <Image src="/teamPhotos/team-img.jpeg" width={800} height={800} />
      </div>
      
      <h2 style={{ marginTop: "3rem" }}>
        Behind the Scenes Team ✨<div className="tape-section"></div>
      </h2>
      <div className="col-three">
        <div className="behind-member-card">
          <Image src="/teamPhotos/mollyj.jpeg" width={200} height={200} />
          <div className="name">Molly J</div>
          <div className="role">Founding Adult/Director</div>
        </div>
        <div className="behind-member-card">
          <Image src="/teamPhotos/evelyn.jpeg" width={200} height={200} />
          <div className="name">Evelyn</div>
          <div className="role">Producer, Dialogue Facilitator</div>
        </div>
        <div className="behind-member-card">
          <Image src="/teamPhotos/cloe.jpeg" width={200} height={200} />
          <div className="name">Cloe</div>
          <div className="role">Artist, Founding Teen</div>
        </div>
        <div className="behind-member-card">
          <Image src="/teamPhotos/mollyz.jpeg" width={200} height={200} />
          <div className="name">Molly Z</div>
          <div className="role">Editor, Music, Sound Engineer</div>
        </div>
        <div className="behind-member-card">
          <Image src="/teamPhotos/theo.jpeg" width={200} height={200} />
          <div className="name">Theo</div>
          <div className="role">Website Creator</div>
        </div>
        <div className="behind-member-card">
          <Image src="/teamPhotos/carson.jpeg" width={200} height={200} />
          <div className="name">Carson</div>
          <div className="role">Social Media Manager</div>
        </div>
      </div> */}
    </main>
  );
};

export default page;
