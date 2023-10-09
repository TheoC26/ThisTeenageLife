import React from 'react'

const page = () => {
  return (
    <main className="aboutPageV2">
      {/* <RandomDrawings /> */}
      {/* <TopMediaPlayer item={episodes[0]} autoPlay={false} page={"home"} /> */}

      <h2>who are we?
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
      
    </main>
  );
}

export default page