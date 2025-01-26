import Coffee from "@/components/Coffee";
import FeaturedBlock from "@/components/FeaturedBlock";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="aboutPageV2">
      {/* <RandomDrawings /> */}
      {/* <TopMediaPlayer item={episodes[0]} autoPlay={false} page={"home"} /> */}

      <h2
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "1.2rem",
          color: "black",
        }}
      >
        <Image src="/navText/aboutus.png" width={300} height={50} />
        <div
          style={{
            backgroundColor: "white",
            padding: ".3rem",
            borderRadius: "5px",
            marginTop: ".7rem",
          }}
        >
          *and our <b>awesome</b> website*
        </div>
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
          lonely, less big, and a little more loving. - Cloe Moreno
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
      {/* <Coffee /> */}
      <h2
        style={{
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "5px",
          marginTop: "5rem",
          marginBottom: "2rem",
        }}
      >
        Website Team ✨<div className="tape-section"></div>
      </h2>
      <div className="container">
        <div className="person">
          <div className="person-info">
            <h3 className="person-name">Cloe M</h3>
            <p className="subtitle">Artist</p>
            <p className="person-description">
              Hi! My name is Cloe and I do the episode art for This Teenage
              Life. I’m currently in Portland, Oregon, where I love to hike,
              meet dogs, and rock climb. I’ve been a part of TTL for a while and
              can’t wait to see where it goes!
            </p>
            <p></p>
          </div>
          <div className="person-image">
            <Image
              src="/teamPhotos/Chloe.jpeg"
              width={200}
              height={200}
              alt="Cloe"
            />
          </div>
        </div>
        <div className="person person-reverse">
          <div className="person-image">
            <Image
              src="/teamPhotos/TheodoreChan.jpeg"
              width={200}
              height={200}
              alt="Theodore"
            />
          </div>
          <div className="person-info">
            <h3 className="person-name person-name-right">Theodore</h3>
            <p className="subtitle">Software Engineer</p>
            <p className="person-description person-description-right">
              Hey! My name is Theodore and I designed and developed the website
              for This Teenage Life. I am somewhat new to TTL but I am excited
              to be a part of the team and proud of everything that has been so
              far!
            </p>
          </div>
        </div>
        <div className="person">
          <div className="person-info">
            <h3 className="person-name">Molly J</h3>
            <p className="subtitle">TTL Director</p>
            <p className="person-description">
              Molly Josephs is a project-based educator who, with an inspiring
              team of teenagers, founded and runs TTL. TTL's dialogue-centered
              community was inspired by her longtime work with Seeds of Peace.
              In addition to running TTL, Molly has spent the past 15 years
              teaching middle and high school biology and computer science.
            </p>
            <p></p>
          </div>
          <div className="person-image">
            <Image
              src="/teamPhotos/MollyJosephs.png"
              width={200}
              height={200}
              alt="Molly J"
            />
          </div>
        </div>
      </div>

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
