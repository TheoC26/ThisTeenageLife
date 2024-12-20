"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import IpodPlayer from "@/components/IpodPlayer";
import { useEpisodesv2 } from "@/context/EpisdoesContextv2";

export default function EpisodeDetails({ params }) {
  const [episodeData, setEpisodeData] = useState(null);
  const [transcript, setTranscript] = useState("");
  const { episodes, setEpisodeNumber } = useEpisodesv2();

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const q = query(
          collection(db, "episodes"),
          where("name", "==", decodeURIComponent(params.episode))
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setEpisodeData(doc.data());
          setTranscript(doc.data().transcript || "");
        }
      } catch (error) {
        console.error("Error fetching episode data:", error);
      }
    };

    fetchEpisodeData();
  }, [params.episode]);

  // Find matching episode from RSS feed
  const rssFeedEpisode = episodes.find(
    (ep) => ep.title === decodeURIComponent(params.episode)
  );

  return (
    <main className="episodeDetailsPage">
      {rssFeedEpisode && (
        <>
          <div className="episodeHeader">
            <h1>{rssFeedEpisode.title}</h1>
            <div className="metadata">
              <span>Season {rssFeedEpisode.itunes.season}</span>
              <span>
                {new Date(rssFeedEpisode.pubDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="playerSection">
            <IpodPlayer
              item={rssFeedEpisode}
              setEpisodeNumber={setEpisodeNumber}
              episodes={episodes}
            />
          </div>

          <div className="description">{rssFeedEpisode.contentSnippet}</div>

          {transcript && (
            <div className="transcript">
              <h2>Episode Transcript</h2>
              <div className="transcriptText">{transcript}</div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
