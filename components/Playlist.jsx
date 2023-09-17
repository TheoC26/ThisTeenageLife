import Image from 'next/image'
import React from 'react'

const Playlist = () => {
  return (
    <div className='playlist'>
        <div className="imageContainer">
            <Image src={"/BG-Images/BG-Image-6.png"} alt='playlist image' width={100} height={100} />
        </div>
        <div className="title">Playlist Title</div>

        <Image src={"/decoratives/sloppyRectRound.svg"} style={{ height: "103%", transform: "translateY(-5px)" }} alt="Drawn border" width={100} height={100} className="decorative" />
    </div>
  )
}

export default Playlist