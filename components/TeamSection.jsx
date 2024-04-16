"use client";
import Image from "next/image";
import React from "react";

// a project for teenagers, by teenagers, about #this teenage life#

const TeamSection = () => {
  // create a list of 30 random names
  const teamMembers = [
    "Molly J",
    "Cloe",
    "Evelyn",
    "Molly Z",
    "Saniya",
    "Divya",
    "Lola",
    "Gamu",
    "Alexis",
    "Caylin",
    "Eva",
    "Jayden",
    "Lydia",
    "Stella",
  ];

  return (
    <div className="teamSection">
      <div className="ourTeam">
        <Image
          src="/navText/OurTeam.png"
          alt="team"
          width={300}
          height={100}
          priority={true}
        />
      </div>
      <div className="computer">
        <div className="screen">
          <div className="peopleGrid">
            {teamMembers.map(
              (name, i) =>
                i < 16 && (
                  <div className="person" key={i}>
                    <Image
                      priority={true}
                      src={`/teamPhotos/${name.replace(" ", "").toLocaleLowerCase()}.jpeg`}
                      alt="person"
                      width={100}
                      height={100}
                    />
                    <div className="name">{name}</div>
                  </div>
                )
            )}
          </div>
        </div>
        <Image
          src="/about/computer.png"
          alt="team"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
};

export default TeamSection;
