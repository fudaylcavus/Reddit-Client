import React from "react";
import { useSelector } from "react-redux";
import { secondsToDate } from "../../../app/util";
import { selectPost } from "../PostSlice";
import './Comments.css'


const Comment = ({comment}) => {

    const post = useSelector(selectPost)
    const { isLoadingComments } = post
    //to handle both replies and spliced comments
    //check if id in the first directory else get in to data.
    if (!comment.id) {
        comment = comment.data;
    }

    return (
        <div key={comment.id} className="post-comment">
            <p className={`author ${isLoadingComments ? "loading" : ""}`}>{comment.author} 
                {post.author === comment?.author ?
                <span style={{color: "blue"}}> OP</span>: ""}
            </p>
            <p className={`comment-content ${isLoadingComments ? "loading" : ""}`}>{comment.body}</p>
            <p className={`timestamp ${isLoadingComments ? "loading" : ""}`}>{secondsToDate(comment.created)}</p>

            {//Sometimes reddits turns array sometimes object to make
            //make it work in every situation, if below is used.
            }
            {(comment?.replies?.constructor === Array) ?
                comment.replies.map((reply, index) => {
                    if (index < 5 && reply.data.body) {
                        return (
                            <div className="reply">
                                <Comment comment={reply} />
                            </div>
                        )
                    } else return ""
                }) : ""
            }
            
        </div>
        
    )
}

const Comments = ({comments}) => {
    return (
        <div className="post-comments">
            {comments.map( (comment, index) => {
                if (comment.body && index < 15) {
                    return <Comment comment={comment} />
                } else return ""
                
            })}
        </div>
    )
}

export default Comments;