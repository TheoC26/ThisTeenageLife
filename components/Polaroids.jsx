import React, { useState, useEffect } from "react";
import Polaroid from "./Polaroid";

const Polaroids = (featured) => {
  const [poem, setPoem] = useState({});
  const [story, setStory] = useState({});
  const [article, setArticle] = useState({});
  const [drawing, setDrawing] = useState({});
  const [photo, setPhoto] = useState({});
  const [episode, setEpisode] = useState({});


  useEffect(() => {
    setPoem(featured.featured.find((post) => post.type === "poem"));
    setStory(featured.featured.find((post) => post.type === "story"));
    setArticle(featured.featured.find((post) => post.type === "article"));
    setDrawing(featured.featured.find((post) => post.type === "drawing"));
    setPhoto(featured.featured.find((post) => post.type === "photo"));
    setEpisode(featured.featured.find((post) => post.type === "reflection"));
  }, [featured.featured])
  return (
    <div className="polaroids">
      {poem && (
        <>
          <Polaroid
            title={poem.title}
            type={"poem"}
            name={poem.author}
            date={poem.formattedDate}
            slug={poem.id}
            imagePath={"/BG-Images/BG-Image-0.png"}
          />
          <Polaroid
            title={story.title}
            type={"story"}
            name={story.author}
            date={story.formattedDate}
            slug={story.id}
            imagePath={"/BG-Images/BG-Image-1.png"}
          />
          <Polaroid
            title={article.title}
            type={"article"}
            name={article.author}
            date={article.formattedDate}
            slug={article.id}
            imagePath={"/BG-Images/BG-Image-2.png"}
          />
          <Polaroid
            title={drawing.title}
            type={"drawing"}
            name={drawing.author}
            date={drawing.formattedDate}
            slug={drawing.id}
            imagePath={"/BG-Images/BG-Image-3.png"}
          />
          <Polaroid
            title={photo.title}
            type={"photo"}
            name={photo.author}
            date={photo.formattedDate}
            slug={photo.id}
            imagePath={"/BG-Images/BG-Image-4.png"}
          />
          <Polaroid
            title={episode.title}
            type={"episode reflection"}
            name={episode.author}
            date={episode.formattedDate}
            slug={episode.id}
            imagePath={"/BG-Images/BG-Image-5.png"}
          />
        </>
      )}
    </div>
  );
};

export default Polaroids;
