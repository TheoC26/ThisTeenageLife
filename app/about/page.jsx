import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <main className="aboutPageV2">
      {/* <RandomDrawings /> */}
      {/* <TopMediaPlayer item={episodes[0]} autoPlay={false} page={"home"} /> */}

      <h2>
        Who are we?
        <div className="tape-section"></div>
      </h2>
      <div className="col-two">
        <video
          src="/placeholdervid.mp4"
          controls
          style={{ border: "5px solid white", borderRadius: "15px" }}
        ></video>
        <div className="text">
          This Teenage Life (TTL) is a podcast about the ideas, stories, and
          unique perspectives of teenagers in the middle of their own growth as
          humans. The episodes that you’ll hear, and people you’ll meet, are
          meant to offer a a sense of connection. For us, it's a way to process
          what we feel and think.
        </div>
      </div>
      <div className="testimonial">
        <div className="quote">
          It can be easy to think "I'm the only one with this issue," but
          hearing other young people share their experiences can normalize
          conversations around sensitive subjects and make the world feel less
          lonely, less big, and a little more loving.{" "}
        </div>
        <div className="author">
          — Cloe Moreno, This Teenage Life artist and contributor
        </div>
      </div>

      <h2 style={{ marginTop: "3rem" }}>
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
      </div>
    </main>
  );
};

export default page;
