import React from 'react'
import { milisecondsToDate, upVoteStyle, urlFix } from '../../app/util'
import './Post.css'

const Post = ({post}) => {
    console.log(post)
   

    return (
        <div className="post">
            <div className="vote-section">
                <i className="fa fa-arrow-up"></i>
                <p>{upVoteStyle(post.ups)}</p>
                <i className="fa fa-arrow-down"></i>
            </div>
            <div className="content-section">
                <div className="info">
                    {`Posted by ${post.author} at ${milisecondsToDate(post.created)}`}
                    <h2 className="title">{post.title}</h2>
                </div>
                <div className="content">
                    {post.img ? 
                        <img src={urlFix(post.img)} onError={(e) => e.target.display = 'none'} alt="post"/> 
                        : ""}
                </div>
                <div className="content-footer">
                    <button>
                        <i class="fa fa-comments"></i>
                        Comments
                    </button> 
                </div>
            </div>
        </div>
    )

}

export default Post