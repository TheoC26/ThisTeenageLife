"use client";
import React, { useEffect, useState, useRef } from "react";
import { useEpisodesv2 } from "@/context/EpisdoesContextv2";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const { episodes } = useEpisodesv2();
  const emptyMouthRef = useRef(null);
  const textRef = useRef(null);
  const microphoneRef = useRef(null);
  const mouthTopLeftRef = useRef(null);
  const mouthTopRightRef = useRef(null);
  const mouthBottomLeftRef = useRef(null);
  const mouthBottomRightRef = useRef(null);

  useEffect(() => {
    let emptyMouthTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".marker",
        start: "0 80px",
        end: "300px top",
        scrub: .5,
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
        duration: 0.34,
        scale: 1.3,
        ease: "power1.inOut",
      })
      .to(emptyMouthRef.current, {
        duration: 0.3, 
        top: -440,
        delay: 0.4, 
        ease: "power1.inOut",
      })
      .to(textRef.current, {
        duration: 0.34, 
        scale: 1.3,
        delay: -1.06, 
        ease: "power1.inOut",
      })
      .to(textRef.current, {
        duration: 0.3, 
        top: -430,
        delay: -0.54, 
        ease: "power1.inOut",
      })
      .to(microphoneRef.current, {
        duration: 0.34, 
        scale: 1.3,
        y: -15,
        x: -6,
        delay: -1.06, 
        ease: "power1.inOut",
      })
      .to(microphoneRef.current, {
        duration: 0.3, 
        top: -430,
        delay: -0.8, 
        ease: "power1.inOut",
      })
      .to(mouthTopLeftRef.current, {
        duration: 0.4, 
        top: -300,
        left: -300,
        scale: 6,
        delay: -0.98, 
        ease: "power1.inOut",
      })
      .to(mouthTopRightRef.current, {
        duration: 0.4, 
        top: -300,
        right: -300,
        scale: 6,
        delay: -0.98, 
        ease: "power1.inOut",
      })
      .to(mouthBottomLeftRef.current, {
        duration: 0.4, 
        bottom: -300,
        left: -300,
        scale: 6,
        delay: -0.98, 
        ease: "power1.inOut",
      })
      .to(mouthBottomRightRef.current, {
        duration: 0.4, 
        bottom: -300,
        right: -300,
        scale: 6,
        delay: -0.98, 
        ease: "power1.inOut",
      });

  }, []);

  return (
    <main className="homePageV2">
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
            top: "45%",
            left: "49%",
            width: "6.8%",
            transform: "translate(-50%, -17%)",
          }}
          ref={microphoneRef}
        />
        <Image
          src={"/TTL-Mouth/MouthTopLeft.png"}
          alt="mouth"
          width={1000}
          height={1000}
          style={{ left: "17%", top: "8%", width: "25%" }}
          ref={mouthTopLeftRef}
        />
        <Image
          src={"/TTL-Mouth/MouthTopRight.png"}
          alt="mouth"
          width={1000}
          height={1000}
          style={{ right: "20%", top: "10%", width: "20%" }}
          ref={mouthTopRightRef}
        />
        <Image
          src={"/TTL-Mouth/MouthBottomLeft.png"}
          alt="mouth"
          width={1000}
          height={1000}
          style={{ left: "18%", bottom: "21%", width: "22%" }}
          ref={mouthBottomLeftRef}
        />
        <Image
          src={"/TTL-Mouth/MouthBottomRight.png"}
          alt="mouth"
          width={1000}
          height={100}
          style={{ right: "18%", bottom: "20%", width: "17%" }}
          ref={mouthBottomRightRef}
        />
      </div>
    </main>
  );
}
