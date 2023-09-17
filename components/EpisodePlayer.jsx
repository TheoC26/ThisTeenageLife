import Image from 'next/image';
import React from 'react'

const EpisodePlayer = () => {
  return (
    <div className="episodePlayer">
      <div className="captions">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
      <div className="player">
        <Image className='base' src={"/icons/playerBase.svg"} alt="player base" width={100} height={100} />
        <Image className='cursor' src={"/icons/playerCursor.svg"} alt="player base" width={50} height={50} />
      </div>
    </div>
  );
}

export default EpisodePlayer