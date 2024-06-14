import React from 'react'
import TapeRow from './TapeRow';
import Image from 'next/image';
import Link from 'next/link';

const TapedPaper = ({imageURL, title, id}) => {
  return (
    <Link href={`/blog/${id}`} className="tapedPaper">
    {/* <div className="tapedPaper"> */}
      <div className="tape-section"></div>
      <Image src={imageURL} width={100} height={100} alt={title}/>
      <div className='title'>{title}</div>
      {/* <div className="topTape"></div> */}
    {/* </div> */}
    </Link>
  );
}

export default TapedPaper