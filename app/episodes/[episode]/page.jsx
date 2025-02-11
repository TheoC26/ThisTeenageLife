"use client";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import IpodPlayer from "@/components/IpodPlayer";
import { useEpisodesv2 } from "@/context/EpisdoesContextv2";
import Link from "next/link";

export default function EpisodeDetails({ params }) {
  const [episodeData, setEpisodeData] = useState(null);
  const [transcript, setTranscript] = useState("");
  const { episodes, setEpisodeNumber, episodeNumber, play, setPlay } = useEpisodesv2();

  let episodeName = decodeURIComponent(params.episode).replace(/_/g, " ");
  if (
    episodeName ===
    "Grind Culture"
  ) {
    episodeName = "Grind Culture: Productivity Pressures, Social Media, and Burnout";
  }
    useEffect(() => {
      const fetchEpisodeData = async () => {
        try {
          const q = query(
            collection(db, "episode"),
            where(
              "name",
              "==",
              episodeName
            )
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            setEpisodeData(doc.data());

            // Process transcript to insert <br /> tags
            if (!doc.data().transcript) {
              return;
            }
            const processedTranscript = doc
              .data()
              .transcript.split(/(\b\w+\s*\b\w*(?=\s*\:)|\b\w*(?=\:))/g) // Match speaker names or numbers before a colon
              .map((segment, idx) =>
                idx % 2 === 1 ? `<br /><br />${segment}` : segment
              ) // Add <br /> before each speaker change
              .join("")
              .trim();

            setTranscript(processedTranscript);
          }
        } catch (error) {
          console.error("Error fetching episode data:", error);
        }
      };

      fetchEpisodeData();
    }, [params.episode]);

  const rssFeedEpisode = episodes.find(
    (ep) => ep.title === episodeName
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
              episodeNumber={episodeNumber}
              isPlaying={play}
              setIsPlaying={setPlay}
            />
          </div>

          <div className="description">{rssFeedEpisode.contentSnippet}</div>

          {episodeData && episodeData.hasRecource && (
            <Link
              href={`/edresources/${encodeURIComponent(rssFeedEpisode.title)}`}
              className="viewResource"
            >
              View this episode's educational resource
            </Link>
          )}

          {transcript && (
            <div className="transcript">
              <h2>Episode Transcript</h2>
              {/* Render transcript as HTML */}
              <div
                className="transcriptText"
                dangerouslySetInnerHTML={{ __html: transcript }}
              ></div>
            </div>
          )}
        </>
      )}
    </main>
  );
}
