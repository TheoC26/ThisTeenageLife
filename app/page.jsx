"use client";
import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import EpisodesSection from "@/components/EpisodesSection";
import TeamSection from "@/components/TeamSection";
import Polaroid from "@/components/Polaroid";
import FeaturedBlogEpisodes from "@/components/FeaturedBlogEpisodes";
import Link from "next/link";
import Coffee from "@/components/Coffee";
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
  // Hero Section
  const [scroll, setScroll] = useState(0);
  const [referrer, setReferrer] = useState("");
  const emptyMouthRef = useRef(null);
  const textRef = useRef(null);
  const microphoneRef = useRef(null);
  const loadingScreenRef = useRef(null);

  const quoteRef = useRef(null);
  const testimonialRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const floatingDecorativeRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    console.log("referrer", document.referrer);
    if (
      document.referrer == "https://www.thisteenagelife.org/" ||
      document.referrer == "http://localhost:3000/" ||
      document.referrer == "https://thisteenagelife.org/"
    ) {
      console.log("referrer", document.referrer);
      loadingScreenRef.current.style.display = "none";
    } else {
      setTimeout(() => {
        loadingScreenRef.current.style.display = "none";
      }, 1500);
    }

    window.addEventListener("scroll", () => {
      setScroll(window.scrollY);
    });
  }, []);

  // Paralax Stuff
  useEffect(() => {
    let emptyMouthTimeline = gsap.timeline({
      scrollTrigger: {
        // trigger: ".marker",
        start: "0px 0px",
        end: "4000px top",
        scrub: 1.5,
        pin: true,
        // markers: true,
      },
    });

    // emptyMouthTimeline
    //   .to(microphoneRef.current, {
    //     duration: 1, // Doubled duration again
    //     top: -500,
    //     delay: 0.0, // Doubled delay again
    //     ease: "power1.inOut",
    //   })
    //   .to(textRef.current, {
    //     duration: 0.9, // Doubled duration again
    //     top: -500,
    //     delay: -0.75, // Doubled delay again
    //     ease: "power1.inOut",
    //   })
    //   .to(emptyMouthRef.current, {
    //     duration: 0.75, // Doubled duration again
    //     top: -500,
    //     delay: -0.75, // Doubled delay again
    //     ease: "power1.inOut",
    //   })
    //   .fromTo(
    //     quoteRef.current,
    //     {
    //       bottom: -400,
    //       rotate: 0,
    //       scale: 1,
    //     },
    //     {
    //       delay: -1, // Doubled delay again
    //       duration: 3, // Doubled duration again
    //       ease: "linear",
    //       top: -500,
    //       rotate: 0,
    //     }
    //   )
    //   .fromTo(
    //     testimonialRefs[0].current,
    //     {
    //       bottom: -400,
    //       left: 10,
    //       ease: "linear",
    //       scale: 0.8,
    //       rotate: 3,
    //     },
    //     {
    //       delay: -3,
    //       duration: 2,
    //       ease: "linear",
    //       top: -700,
    //       rotate: -3,
    //       left: 15,
    //     }
    //   )
    //   .fromTo(
    //     testimonialRefs[1].current,
    //     {
    //       bottom: -400,
    //       right: 10,
    //       ease: "linear",
    //       scale: 1,
    //     },
    //     {
    //       delay: -2.5,
    //       duration: 1.5,
    //       ease: "linear",
    //       top: -500,
    //     }
    //   )
    //   .fromTo(
    //     testimonialRefs[2].current,
    //     {
    //       bottom: -400,
    //       left: 0,
    //       ease: "linear",
    //       scale: 1.1,
    //     },
    //     {
    //       delay: -1.4,
    //       duration: 1.2,
    //       ease: "linear",
    //       top: -500,
    //     }
    //   )
    //   .fromTo(
    //     testimonialRefs[3].current,
    //     {
    //       bottom: -400,
    //       right: 10,
    //       ease: "linear",
    //       scale: 0.9,
    //       rotate: -3,
    //     },
    //     {
    //       delay: -1.6,
    //       duration: 1.8,
    //       ease: "linear",
    //       top: -700,
    //       rotate: 0,
    //     }
    //   )
    //   .fromTo(
    //     floatingDecorativeRefs[0].current,
    //     {
    //       bottom: -1300,
    //       left: -100,
    //       ease: "linear",
    //       scale: 1,
    //       rotate: 10,
    //     },
    //     {
    //       delay: -2.5,
    //       duration: 3,
    //       ease: "linear",
    //       top: -3000,
    //       rotate: 0,
    //     }
    //   )
    //   .fromTo(
    //     floatingDecorativeRefs[1].current,
    //     {
    //       bottom: -1300,
    //       left: 1000,
    //       ease: "linear",
    //       scale: 1,
    //       rotate: -10,
    //     },
    //     {
    //       delay: -4,
    //       duration: 3,
    //       ease: "linear",
    //       top: -3000,
    //       rotate: 0,
    //     }
    //   );

    // emptyMouthTimeline
    //   .to(microphoneRef.current, {
    //     duration: 1, // Doubled duration again
    //     top: -500,
    //     delay: 0.0, // Doubled delay again
    //     ease: "power1.inOut",
    //   })
    //   .to(textRef.current, {
    //     duration: 0.9, // Doubled duration again
    //     top: -500,
    //     delay: -0.75, // Doubled delay again
    //     ease: "power1.inOut",
    //   })
    //   .to(emptyMouthRef.current, {
    //     duration: 0.75, // Doubled duration again
    //     top: -500,
    //     delay: -0.75, // Doubled delay again
    //     ease: "power1.inOut",
    //   })
    //   .to(
    //     quoteRef.current,
    //     {
    //       delay: -.75, // Doubled delay again
    //       duration: 2.2, // Doubled duration again
    //       ease: "linear",
    //       top: -500,
    //       rotate: 0,
    //     }
    //   )
    //   .to(
    //     testimonialRefs[0].current,
    //     {
    //       delay: -1.9,
    //       duration: 2.2,
    //       ease: "linear",
    //       top: -700,
    //       rotate: -3,
    //       left: 15,
    //     }
    //   )
    //   .to(
    //     testimonialRefs[1].current,
    //     {
    //       delay: -2.8,
    //       duration: 1.5,
    //       rotate: 2,
    //       ease: "linear",
    //       top: -500,
    //     }
    //   )
    //   .to(
    //     testimonialRefs[2].current,
    //     {
    //       delay: -2.3,
    //       duration: 1.3,
    //       ease: "linear",
    //       top: -500,
    //     }
    //   )
    //   .to(
    //     testimonialRefs[3].current,
    //     {
    //       delay: -2.7,
    //       duration: 1.8,
    //       ease: "linear",
    //       top: -700,
    //       rotate: 0,
    //     }
    //   )
    //   .to(
    //     floatingDecorativeRefs[0].current,
    //     {
    //       delay: -3,
    //       duration: 3.2,
    //       ease: "linear",
    //       top: -3000,
    //       rotate: 0,
    //     }
    //   )
    //   .to(
    //     floatingDecorativeRefs[1].current,
    //     {
    //       delay: -3.2,
    //       duration: 3,
    //       ease: "linear",
    //       top: -3000,
    //       rotate: 0,
    //     }
    //   );

    emptyMouthTimeline
      .to(microphoneRef.current, {
        duration: 1, // Doubled duration again
        top: -500,
        delay: 0.0, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(textRef.current, {
        duration: 0.9, // Doubled duration again
        top: -500,
        delay: -0.75, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(emptyMouthRef.current, {
        duration: 0.75, // Doubled duration again
        top: -500,
        delay: -0.75, // Doubled delay again
        ease: "power1.inOut",
      })
      .to(
        quoteRef.current,

        {
          delay: -1, // Doubled delay again
          duration: 2.7, // Doubled duration again
          ease: "linear",
          top: -500,
          rotate: 0,
        }
      )
      .to(testimonialRefs[0].current, {
        delay: -2.6,
        duration: 2,
        ease: "linear",
        top: -700,
        rotate: -3,
        left: 15,
      })
      .to(testimonialRefs[1].current, {
        delay: -2.4,
        duration: 1.5,
        ease: "linear",
        top: -500,
        rotate: 3,
      })
      .to(testimonialRefs[2].current, {
        delay: -1.3,
        duration: 1.2,
        ease: "linear",
        top: -500,
        rotate: -4,
      })
      .to(
        testimonialRefs[3].current,

        {
          delay: -1.6,
          duration: 1.8,
          ease: "linear",
          top: -700,
          rotate: 3,
        }
      )
      .to(
        floatingDecorativeRefs[0].current,

        {
          delay: -2.5,
          duration: 3,
          ease: "linear",
          top: -3000,
          rotate: 0,
        }
      )
      .to(
        floatingDecorativeRefs[1].current,

        {
          delay: -3,
          duration: 3,
          ease: "linear",
          top: -3000,
          rotate: 0,
        }
      );
  }, []);

  return (
    <>
      <div className="loadingScreen" ref={loadingScreenRef}>
        <div className="outside">
          <div className="typwriter">Welcome to our community!</div>
        </div>
      </div>
      <div className="homePageV2Mobile">
        <div className="hero">
          <Image
            src={"/TTL-Mouth/ttlLogoFull.png"}
            alt="empty mouth"
            width={100}
            height={100}
            priority={true}
          />
        </div>
        <div className="quote">
          <span style={{ fontSize: "2.5rem" }}>This Teenage Life -</span>
          <br />{" "}
          <span style={{ fontSize: "1.75rem" }}>
            a global youth dialogue and podcasting program
          </span>{" "}
          <br />
          <br />
          With approximately 50 teen contributors and hundreds of thousands of
          listeners, we help teens throughout the world develop communication
          skills, authentic community, and a sense of purpose.
        </div>
      </div>
      {/* --- DESKTOP ---  */}
      <main className="homePageV3">
        <div
          className="downarrow"
          style={{ display: scroll > 15 ? "none" : "block" }}
        >
          <div className="left"></div>
          <div className="right"></div>
        </div>

        <div className="spacer"></div>
        <div className="paralax">
          <Image
            className="hero-img"
            src={"/TTL-Mouth/emptyMouth.png"}
            alt="empty mouth"
            width={1000}
            height={1000}
            style={{ top: "42%", left: "50%", width: "48%" }}
            ref={emptyMouthRef}
            priority={true}
          />
          <Image
            className="hero-img"
            src={"/TTL-Mouth/text.png"}
            alt="This Teenage Life"
            width={1000}
            height={1000}
            style={{ top: "42%", left: "50%", width: "32%" }}
            ref={textRef}
          />
          <Image
            className="hero-img"
            src={"/TTL-Mouth/microphone.png"}
            alt="microphone"
            width={1000}
            height={1000}
            style={{
              top: "50.9%",
              left: "49%",
              width: "6.8%",
            }}
            ref={microphoneRef}
          />

          {/* testimonials */}
          <div className="featured-on featured-on-0" ref={testimonialRefs[0]}>
            {/* <Image
              src={"/speechBubbles/speechBubble1.png"}
              alt="speech bubble"
              width={1000}
              height={1000}
            />
            <div className="text">
              It can be easy to think "I'm the only one with this issue," but
              hearing other young people share their experiences can make the
              world feel a little more loving. <br />
              <br /> - Cloe Moreno, TTL Artist, CA
            </div> */}
            <Polaroid
              title={"The Today Show"}
              type={"featured on"}
              imagePath={"/featuredOn/todayShow.png"}
              isHome={true}
              slug={
                "https://www.today.com/video/learn-about-the-mission-behind-global-podcast-this-teenage-life-230558789627"
              }
            />
          </div>
          <div className="testimonial testimonial-1" ref={testimonialRefs[1]}>
            <Image
              src={"/speechBubbles/SpeechBubble3.png"}
              alt="speech bubble"
              width={1000}
              height={1000}
            />
            <div className="text">
              “When I do TTL, I feel like I have a group of friends who truly
              get me. I feel supported and heard and validated. TTL keeps me
              afloat when I feel so alone.” <br />
              <br /> — Lydia, 14, NYC
            </div>
          </div>
          <div className="testimonial testimonial-2" ref={testimonialRefs[2]}>
            <Image
              src={"/speechBubbles/SpeechBubble2.png"}
              alt="speech bubble"
              width={1000}
              height={1000}
            />
            <div className="text">
              “I've been struggling with feeling isolated and sad but hearing
              other people and their experiences really helped me feel seen and
              not alone.” <br />
              <br /> - Gamu, 18, UK
            </div>
          </div>
          <div className="featured-on featured-on-1 " ref={testimonialRefs[3]}>
            {/* <Image
              src={"/speechBubbles/speechBubble4.png"}
              alt="speech bubble"
              width={1000}
              height={1000}
            />
            <div className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              delectus expedita inventore ab, iste quae nostrum culpa, dolorem
              voluptatibus rerum cumque repellat unde perferendis sed maiores
              eos.
            </div> */}
            <Polaroid
              title={"Brown Alumni Magazine"}
              type={"featured on"}
              imagePath={"/featuredOn/brownAlumni.jpeg"}
              slug={
                "https://www.brownalumnimagazine.com/articles/2024-03-15/are-the-kids-alright-molly-josephs-%E2%80%9909-this-teenage-life"
              }
              isHome={true}
            />
          </div>
          <div
            className="decorative decorative-1"
            ref={floatingDecorativeRefs[0]}
          >
            <Image
              src={"/decoratives/headphones1.png"}
              alt="headphones"
              width={1000}
              height={1000}
            />
          </div>
          <div
            className="decorative decorative-2"
            ref={floatingDecorativeRefs[1]}
          >
            <Image
              src={"/decoratives/headphones2.png"}
              alt="headphones"
              width={1000}
              height={1000}
            />
          </div>

          {/* <div className="testimonial testimonial-4" ref={testimonialRefs[4]}>
            <div className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              delectus expedita inventore ab, iste quae nostrum culpa, dolorem
              voluptatibus rerum cumque repellat unde perferendis sed maiores
              eos.
            </div>
          </div>
          <div className="testimonial testimonial-5" ref={testimonialRefs[5]}>
            <div className="text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              delectus expedita inventore ab, iste quae nostrum culpa, dolorem
              voluptatibus rerum cumque repellat unde perferendis sed maiores
              eos.
            </div>
          </div> */}
          <div className="quote" ref={quoteRef}>
            <span style={{ fontSize: "3rem" }}>This Teenage Life -</span>
            <br />{" "}
            <span style={{ fontSize: "2.5rem" }}>
              a global youth dialogue and podcasting program
            </span>{" "}
            <br />
            <br />
            With approximately 50 teen contributors and hundreds of thousands of
            listeners, we help teens throughout the world develop communication
            skills, authentic community, and a sense of purpose.
          </div>
        </div>
      </main>

      <TeamSection />
      {/* <EpisodesSection /> */}
      <FeaturedBlogEpisodes />
    </>
  );
}
