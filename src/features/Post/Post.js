import { useDispatch, useSelector } from 'react-redux'
import Reddit from '../../app/Reddit'
import { milisecondsToDate, shortenNumber, urlFix } from '../../app/util'
import { selectIsLoading } from '../PostList/PostListSlice'
import './Post.css'
import { addComment } from './PostSlice'

const Post = (props) => {
    const dispatch = useDispatch();
    const { post } = props;
    const isLoading = useSelector(selectIsLoading)
    const getComments = () => {
        Reddit.getPostComments(post.permalink).then(comments => {
            comments.forEach( comment => {
                dispatch(addComment({
                    author: comment.author,
                    content: comment.body_html,
                    created: comment.created,
                    replies: comment.replies?.data?.children
                }))
            })
        })
    }
        
    let styling = {
        post: "post",
        voteSection: "vote-section",
        empty: "",
        contentSection: "content-section",
        info: "info",
        content: "content",
        title: "title",
        contentFooter: "content-footer",
        commentButton: "display: none"
    }
    if (isLoading) {
        for (let key in styling) {
            styling[key] += " loading";
        }
    }

    return (
        
        <div className="post">
            <div className="vote-section">
                <i className="fa fa-arrow-up"></i>
                <p className={styling.empty || 0 }>{shortenNumber(post.ups)}</p>
                <i className="fa fa-arrow-down"></i>
            </div>
            <div className="content-section">
                <div className={styling.info}>
                    <p>{`Posted by ${post.author || ""} ${milisecondsToDate(post.created)}`}</p>
                </div>
                <div className="content">
                    <h2 className={styling.title}>{post.title || "hello man, nice to see you here."}</h2>
                    {post.img ? 
                        (isLoading ? "" : <img src={urlFix(post.img)} onError={(e) => e.target.display = 'none'} alt="post"/> )
                        : ""}
                </div>
                <div className="content-footer">
                    
                        <button className={styling.empty} onClick={getComments}>
                            <i class="fa fa-comments"></i>
                            {isLoading ? "" :
                                shortenNumber(post.commentCount)
                            }
                        </button>  
                    
                </div>
            </div>
        </div>
    )

}

export default Post