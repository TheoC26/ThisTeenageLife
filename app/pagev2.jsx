"use client";
import React, { useEffect, useState, useRef } from "react";
import { useEpisodesv2 } from "@/context/EpisdoesContextv2";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Polaroid from "@/components/Polaroid";
import IpodPlayer from "@/components/IpodPlayer";
import { db } from "../firebase.js";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
gsap.registerPlugin(ScrollTrigger);

// TODO: make the first thing that comes up the ipod player of newest episode
// - the ipods: newest episode, featured: funny, featured: serious
// -x- make responsive
// -x- the footer: contact: email, instagram
//               links: home, about, episodes, blog, recources
//               contribute: create a blog post, join the team (send email), send a message (send an email)
//               listen: our little ipod, spotify logo, apple podcasts logo
// - add a thing to the bottom saying explore our episodes!
// - recouces page: add an under construction thing
// - about page: show the video, the little block of text, the testimonial, and then the team thing (figma)
// - take away the merch link
// -x- add paper behind the blog page say: "TTL Blog: For Teens by Teens"

export default function Home() {
  const { episodes, setEpisodeNumber } = useEpisodesv2();
  const emptyMouthRef = useRef(null);
  const textRef = useRef(null);
  const microphoneRef = useRef(null);
  const mouthTopLeftRef = useRef(null);
  const mouthTopRightRef = useRef(null);
  const mouthBottomLeftRef = useRef(null);
  const mouthBottomRightRef = useRef(null);
  const polaroidRefs = [useRef(null), useRef(null), useRef(null)];
  const ipodRefs = [useRef(null), useRef(null), useRef(null)];
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [scroll, setScroll] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [featuredBlogPosts, setFeaturedBlogPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const collectionRef = collection(db, "/posts");
        // make it so that it only querys for posts which are featured and order by desc
        // const q = query(collectionRef, orderBy("date", "desc"));
        const q = query(collectionRef, where("featured", "==", true));
        const docSnap = await getDocs(q);
        var tempArr = [];
        docSnap.forEach((doc) => {
          tempArr.push(
            Object.assign(doc.data(), {
              id: doc.id,
              formattedDate: convertDateToFormattedDate(doc.data().date),
            })
          );
        });
        console.log(tempArr);
        setFeaturedBlogPosts(tempArr);
      } catch (err) {
        setError("Failed to load sources");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  function convertDateToFormattedDate(date) {
    const unixTimestamp = date.seconds;
    const milliseconds = unixTimestamp * 1000;
    const dateObject = new Date(milliseconds);
    return (
      dateObject.getMonth() +
      1 +
      "/" +
      dateObject.getDate() +
      "/" +
      dateObject.getFullYear()
    );
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
  }, []);

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Initial dimensions
    updateWindowDimensions();

    // Event listener for window resize
    window.addEventListener("resize", updateWindowDimensions);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateWindowDimensions);
    };
  }, []);

  useEffect(() => {
    let emptyMouthTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".marker",
        start: "0 80px",
        end: "1500px top",
        scrub: 3,
        pin: true,
        // markers: true,
      },
    });
    // let textTimeline = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".marker",
    //     start: "0 80px",
    //     end: "300px top",
    //     scrub: 1,
    //     pin: true,
    //     // markers: true,
    //   },
    // });
    // let microphoneTimeline = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".marker",
    //     start: "0 80px",
    //     end: "300px top",
    //     scrub: 1,
    //     pin: true,
    //     markers: true,
    //   },
    // });
    // {
    //     scrollTrigger: {
    //       trigger: ".hero",
    //       start: "0 0",
    //       end: "bottom top",
    //       scrub: 1,
    //       pin: true,
    // markers: true,
    //     },
    // }
    // textTimeline
    //   .to(textRef.current, {
    //     duration: 0.68,
    //     scale: 1.3,
    //     ease: "power1.inOut",
    //   })
    //   .to(textRef.current, {
    //     duration: 0.6,
    //     top: -400,
    //     delay: 0.36,
    //     ease: "power1.inOut",
    //   });

    // microphoneTimeline
    //   .to(microphoneRef.current, {
    //     duration: 0.68,
    //     scale: 1.3,
    //     y: -15,
    //     x: -4,
    //     ease: "power1.inOut",
    //   })
    //   .to(microphoneRef.current, {
    //     duration: 0.6,
    //     top: -400,
    //     delay: 0.2,
    //     ease: "power1.inOut",
    //   });

    // gsap.to(mouthTopLeftRef.current, {
    //   duration: 0.8,
    //   top: -300,
    //   left: -300,
    //   scale: 6,
    //   ease: "power1.inOut",
    //   scrollTrigger: {
    //     trigger: ".hero",
    //     start: "0 0",
    //     end: "bottom top",
    //     scrub: 1,
    //     pin: true,
    //     // markers: true,
    //   },
    // });

    // gsap.to(mouthTopRightRef.current, {
    //   duration: 0.8,
    //   top: -300,
    //   right: -300,
    //   scale: 6,
    //   ease: "power1.inOut",
    //   scrollTrigger: {
    //     trigger: ".hero",
    //     start: "0 0",
    //     end: "bottom top",
    //     scrub: 1,
    //     pin: true,
    //     // markers: true,
    //   },
    // });

    // gsap.to(mouthBottomLeftRef.current, {
    //   duration: 0.8,
    //   bottom: -300,
    //   left: -300,
    //   scale: 6,
    //   ease: "power1.inOut",
    //   scrollTrigger: {
    //     trigger: ".hero",
    //     start: "0 0",
    //     end: "bottom top",
    //     scrub: 1,
    //     pin: true,
    //     // markers: true,
    //   },
    // });

    //   gsap.to(mouthBottomRightRef.current, {
    //     duration: 0.8,
    //     bottom: -300,
    //     right: -300,
    //     scale: 6,
    //     ease: "power1.inOut",
    //     scrollTrigger: {
    //       trigger: ".hero",
    //       start: "0 0",
    //       end: "bottom top",
    //       scrub: 1,
    //       pin: true,
    //       // markers: true,
    //     },
    //   });
    // }, []);

    emptyMouthTimeline
      .to(emptyMouthRef.current, {
        duration: 1.36, // Doubled duration again
        scale: 1.3,
        ease: "power1.inOut",
      })
      .to(emptyMouthRef.current, {
        duration: 1.2, // Doubled duration again
        top: -440,
        delay: 1.6, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(textRef.current, {
        duration: 1.36, // Doubled duration again
        scale: 1.3,
        delay: -4.24, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(textRef.current, {
        duration: 1.2, // Doubled duration again
        top: -430,
        delay: -2.16, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(microphoneRef.current, {
        duration: 1.36, // Doubled duration again
        scale: 1.3,
        y: -15,
        x: -6,
        delay: -4.24, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(microphoneRef.current, {
        duration: 1.2, // Doubled duration again
        top: -430,
        delay: -3.2, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(mouthTopLeftRef.current, {
        duration: 1.6, // Doubled duration again
        top: -300,
        left: -300,
        scale: 6,
        delay: -3.92, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(mouthTopRightRef.current, {
        duration: 1.6, // Doubled duration again
        top: -300,
        right: -300,
        scale: 6,
        delay: -3.92, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(mouthBottomLeftRef.current, {
        duration: 1.6, // Doubled duration again
        bottom: -300,
        left: -300,
        scale: 6,
        delay: -3.92, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(mouthBottomRightRef.current, {
        duration: 1.6, // Doubled duration again
        bottom: -300,
        right: -300,
        scale: 6,
        delay: -3.92, // Doubled delay again
        ease: "power1.inOut",
      })
      .fromTo(
        polaroidRefs[0].current,
        {
          bottom: -400,
          left: 100,
          rotate: 0,
          scale: 0.8,
        },
        {
          delay: -2.8, // Doubled delay again
          duration: 9, // Doubled duration again
          top: -500,
          rotate: 0,
        }
      )
      .fromTo(
        polaroidRefs[1].current,
        {
          bottom: -400,
          right: 200,
          rotate: 0,
        },
        {
          delay: -8, // Doubled delay again
          duration: 7, // Doubled duration again
          top: -400,
          rotate: 0,
        }
      )
      .fromTo(
        ipodRefs[2].current,
        {
          bottom: -400,
          left: 450,
          rotate: 0,
          scale: 1.1,
        },
        {
          delay: -8.5, // Doubled delay again
          duration: 5, // Doubled duration again
          top: -400,
          rotate: 0,
        }
      )
      .fromTo(
        ipodRefs[0].current,
        {
          bottom: -400,
          left: 200,
          rotate: 0,
          scale: 0.9,
        },
        {
          delay: -7,
          duration: 10, // Doubled duration again
          top: -500,
          rotate: 0,
        }
      )
      .fromTo(
        ipodRefs[1].current,
        {
          bottom: -400,
          right: 100,
          rotate: 0,
          scale: 1.1,
        },
        {
          delay: -9, // Doubled delay again
          duration: 7, // Doubled duration again
          top: -400,
          rotate: 0,
        }
      )
      .fromTo(
        polaroidRefs[2].current,
        {
          bottom: -400,
          right: 500,
          rotate: 0,
          scale: 1.1,
        },
        {
          delay: -7, // Doubled delay again
          duration: 6, // Doubled duration again
          top: -400,
          rotate: 0,
        }
      );
  }, []);

  return (
    <>
      <div className="homePageV2Mobile">
        <div className="hero">
          <Image
            src={"/TTL-Mouth/ttlLogoFull.png"}
            alt="empty mouth"
            width={1000}
            height={1000}
          />
        </div>
      </div>
      <main className="homePageV2">
        <div
          class="downarrow"
          style={{ display: scroll > 15 ? "none" : "block" }}
        >
          <div class="left"></div>
          <div class="right"></div>
        </div>

        <div className="marker"></div>
        <div className="hero">
          <Image
            src={"/TTL-Mouth/emptyMouth.png"}
            alt="empty mouth"
            className="center"
            width={1000}
            height={1000}
            style={{ top: "45%", left: "50%", width: "48%" }}
            ref={emptyMouthRef}
          />
          <Image
            src={"/TTL-Mouth/text.png"}
            alt="This Teenage Life"
            width={1000}
            height={1000}
            className="center"
            style={{ top: "45%", left: "50%", width: "32%" }}
            ref={textRef}
          />
          <Image
            src={"/TTL-Mouth/microphone.png"}
            alt="microphone"
            className="center"
            width={1000}
            height={1000}
            style={{
              top: "52%",
              left: "49%",
              width: "6.8%",
              transform: "translate(-50%, -50%)",
            }}
            ref={microphoneRef}
          />
          <Image
            src={"/TTL-Mouth/MouthTopLeft.png"}
            alt="mouth"
            width={1000}
            height={1000}
            style={{
              left: "17%",
              top: (815 - 1420) / 40 + 23 + "%",
              width: "25%",
            }}
            ref={mouthTopLeftRef}
          />
          <Image
            src={"/TTL-Mouth/MouthTopRight.png"}
            alt="mouth"
            width={1000}
            height={1000}
            style={{
              right: "20%",
              top: (815 - 1420) / 40 + 23 + "%",
              width: "20%",
            }}
            ref={mouthTopRightRef}
          />
          <Image
            src={"/TTL-Mouth/MouthBottomLeft.png"}
            alt="mouth"
            width={1000}
            height={1000}
            style={{
              left: "18%",
              bottom: (815 - 1420) / 50 + 35 + "%",
              width: "22%",
            }}
            ref={mouthBottomLeftRef}
          />
          <Image
            src={"/TTL-Mouth/MouthBottomRight.png"}
            alt="mouth"
            width={1000}
            height={100}
            style={{
              right: "18%",
              bottom: (815 - 1420) / 50 + 35 + "%",
              width: "17%",
            }}
            ref={mouthBottomRightRef}
          />
        </div>
        <div
          className="paralax"
          style={{ width: "20rem" }}
          ref={polaroidRefs[0]}
        >
          <Polaroid
            title={featuredBlogPosts[0] && featuredBlogPosts[0].title}
            type={featuredBlogPosts[0] && featuredBlogPosts[0].type}
            name={featuredBlogPosts[0] && featuredBlogPosts[0].author}
            date={featuredBlogPosts[0] && featuredBlogPosts[0].formattedDate}
            slug={featuredBlogPosts[0] && featuredBlogPosts[0].id}
            imagePath={"/BG-Images/BG-Image-0.png"}
          />
        </div>
        <div
          className="paralax"
          style={{ width: "20rem" }}
          ref={polaroidRefs[1]}
        >
          <Polaroid
            title={"title"}
            type={"poem"}
            name={"author"}
            date={"date"}
            slug={"poem.id"}
            imagePath={"/BG-Images/BG-Image-0.png"}
          />
        </div>
        <div
          className="paralax"
          style={{ width: "20rem" }}
          ref={polaroidRefs[2]}
        >
          <Polaroid
            title={"title"}
            type={"poem"}
            name={"author"}
            date={"date"}
            slug={"poem.id"}
            imagePath={"/BG-Images/BG-Image-0.png"}
          />
        </div>
        <div className="paralax" ref={ipodRefs[0]}>
          <IpodPlayer
            item={episodes[0]}
            setEpisodeNumber={setEpisodeNumber}
            episodes={episodes}
          />
        </div>
        <div className="paralax" ref={ipodRefs[1]}>
          <IpodPlayer
            item={episodes[1]}
            setEpisodeNumber={setEpisodeNumber}
            episodes={episodes}
          />
        </div>
        <div className="paralax" ref={ipodRefs[2]}>
          <IpodPlayer
            item={episodes[2]}
            setEpisodeNumber={setEpisodeNumber}
            episodes={episodes}
          />
        </div>
      </main>
      <div className="homePageBottom">
        <a href="/episodes" className="episodes">
          View our episodes!
        </a>
        <a href="/blog" className="blog">
          Visit our blog!
        </a>
      </div>
    </>
  );
}
