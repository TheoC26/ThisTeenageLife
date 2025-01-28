"use client";
import Image from "next/image";
import React, {useState} from "react";

// a project for teenagers, by teenagers, about #this teenage life#

const TeamSection = () => {

  const [page, setPage] = useState(0);

  const teamMembers = [
    "Molly J",

    "Evelyn",
    "Jayden",
    "Lydia",
    "Stella",
    "Alexis",
    "Divya",
    "Kashika",
    "Maith",
    "Eva",
    "Cay",

    "Saniya R",
    "Saniya Z",

    "Lola",
    "Gamu",

    "Haven",

    "Kara",
    "Ummul",
    "Matu",
    "Medha",

    "Brin",
    "Bethany",
    "Gargi",
    "Jacqui",
    "Harini",

    
    "Molly Z",
    "Cloe",
    "Olivia",
    "Cami",
    "Taylor",
    "Jade",
    "Shreena",
    "Arshita",
    "Krithiga",
    "Bhargabi",
    "Aanya",
    "Yashasvi",
    "Sophia",
    "Shreyaan"
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
                page * 16 -1 < i &&
                i < page * 16 + 16 && (
                  <div className="person" key={i}>
                    <Image
                      priority={true}
                      src={`/teamPhotos/${name
                        .replace(" ", "")
                        .toLocaleLowerCase()}.jpeg`}
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
      <div className="next back" onClick={() => page >=1 && setPage(page-1)}>Back</div>
      <div className="next" onClick={() => page <=1 && setPage(page+1)}>Next</div>
      </div>
    </div>
  );
};

export default TeamSection;
