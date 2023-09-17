"use client";
import FeaturedBlock from "@/components/FeaturedBlock";
import RandomDrawings from "@/components/RandomDrawings";
import TopMediaPlayer from "@/components/TopMediaPlayer";
import { useEpisodes } from "@/context/EpisodesContext";
import Image from "next/image";

const posts = [
  {
    title: "My Life through the Years",
    type: "poem",
    content:
      "In spring, I shall love you! In summer, I shall weep for you;In autumn, I shall grow tall and sturdy Into a tree so evergreen;And I shall be your...",
    name: "Kashika Barkakati",
    date: "4/23/2020",
    featured: false,
    published: true,
  },
];

const featuredPosts = [
  {
    title: "My Life through the Years",
    type: "poem",
    content:
      "In spring, I shall love you! In summer, I shall weep for you;In autumn, I shall grow tall and sturdy Into a tree so evergreen;And I shall be your...",
    author: "Kashika Barkakati",
    location: "Mumbai",
    date: "4/23/2020",
    featured: true,
    published: true,
  },
  {
    title: "My Life through the Years",
    type: "image",
    description:
      "In spring, I shall love you! In summer, I shall weep for you;In autumn, I shall grow tall and sturdy Into a tree so evergreen;And I shall be your...",
    imageID: "SI23032EWLE2",
    author: "Kashika Barkakati",
    date: "4/23/2020",
    featured: true,
    published: true,
  },
];

const episodes = [
  {
    title: "Loneliness 2.0",
    date: "5/23/2023",
    description: "this is a description",
    question: "This is a thought provoking question",
    imageID: "SLD23023SLKFDS230",
    libysenID: "woiwkdoiw02023",
    responses: [
      "this is a response",
      "this is another response",
      "this is a very interesting response to the thought provoking question",
    ],
  },
];

const team = [
  {
    name: "Random Person",
    type: "contributor",
    imageID: "SLD23023SLKFDS230",
    bio: "this is theos bio and it is not very long",
    birthday: "2/23/2007",
    joinDate: "4/12/2020",
    location: "Japan",
  },
  {
    name: "Theodore Chan",
    type: "producer",
    role: "software engineer",
    imageID: "SLD23023SLKFDS230",
    bio: "this is theos bio and it is not very long",
  },
  {
    name: "Another Name",
    type: "past",
    location: "Mumbai",
    imageID: "SLD23023SLKFDS230",
    yearsContributed: 7,
  },
];

export default function Home() {
  const { episodes } = useEpisodes();

  return (
    <main className="homePageV1">
      <RandomDrawings />
      <TopMediaPlayer item={episodes[0]} autoPlay={false} page={"home"} />

      <h2>who are we?</h2>
      <div className="col-two">
        <video
          src="/placeholdervid.mp4"
          // controls
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
      <h2>listen to the podcast!</h2>
      <h2>check out our blog!</h2>
      <h2>view our educational resources!</h2>
    </main>
  );
}
