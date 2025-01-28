"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import RandomDrawings from '@/components/RandomDrawings'

const Contribute = () => {
  return (
    <main className="contributePage">
      <RandomDrawings />
      <h1>Ways to Contribute</h1>
      <p className="subtitle">Join our community and make a difference!</p>

      <div className="contribute-grid">
        <Link
          href="https://donate.stripe.com/14kdUCc0HaAy9SEfYY"
          className="contribute-card primary"
          target="_blank"
        >
          <div className="card-content">
            <Image
              src="/decoratives/supportOurWork.png"
              width={80}
              height={80}
              alt="Support icon"
            />
            <h2>Support our work</h2>
            <p>
              Help us continue creating meaningful content and fostering teen
              dialogue
            </p>
          </div>
        </Link>

        <Link href="/join" className="contribute-card">
          <div className="card-content">
            <Image
              src="/decoratives/headphones1.png"
              width={80}
              height={80}
              alt="Join icon"
            />
            <h2>Join the team</h2>
            <p>Become part of our dialogue groups and podcast community</p>
          </div>
        </Link>

        <Link href="/blog/contribute" className="contribute-card">
          <div className="card-content">
            <Image
              src="/decoratives/wannaContribute.png"
              width={80}
              height={80}
              alt="Write icon"
            />
            <h2>Write a blog post</h2>
            <p>Share your story, art, or perspective in our teen zine</p>
          </div>
        </Link>

        <Link
          href="mailto:team@thisteenagelife.org"
          className="contribute-card"
        >
          <div className="card-content">
            <Image
              src="/decoratives/sendAMessage.png"
              width={80}
              height={80}
              alt="Message icon"
            />
            <h2>Send a message</h2>
            <p>Get in touch with our team - we'd love to hear from you!</p>
          </div>
        </Link>
      </div>
    </main>
  );
}

export default Contribute