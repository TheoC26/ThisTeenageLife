import Image from 'next/image'
import React from 'react'

const BlogPostImage = ({url, title}) => {
  return (
    <div className='blogPostImage'>
        <div className='tape-section'></div>
        <Image src={url} alt={title} width={1000} height={1000} />
    </div>
  )
}

export default BlogPostImage