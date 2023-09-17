"use client"
import React, { useEffect, useState } from "react";
import Parser from "rss-parser";
import Playlist from "@/components/Playlist";

const recources = () => {
  const RSS_URL = `http://feeds.libsyn.com/169844/rss/`;

  useEffect(() => {
    const fetchRSS = async () => {
      const parser = new Parser();
      const feed = await parser.parseURL(RSS_URL);
      console.log(feed);
    };
    fetchRSS();
  }, []);

  return (
    <main>
      <div>recources</div>
      <div className="col-four">
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
        <Playlist />
      </div>
    </main>
  );
};

export default recources;
