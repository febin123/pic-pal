import React from 'react'
import "../Styles/Post.css"
import Avatar from '@mui/material/Avatar';
const Post = ({username,caption,imgUrl}) => {
  return (
    <div className='post'>
        <div className="post__header">
            <Avatar className="post__avatar" src=""/>
            <h3>{username}</h3>
        </div>
      <img src={imgUrl} alt="" className='post__image'/>
      <h4 className='post__text'> <strong>{caption}</strong> using React</h4>
      

    </div>
  )
}

export default Post
