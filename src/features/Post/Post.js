import { useDispatch } from 'react-redux'
import Reddit from '../../app/Reddit'
import { milisecondsToDate, shortenNumber, urlFix } from '../../app/util'
import './Post.css'
import { addComment } from './PostSlice'

const Post = (props) => {
    const dispatch = useDispatch();
    const { post } = props;
    
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
        
    

    return (
        <div className="post">
            <div className="vote-section">
                <i className="fa fa-arrow-up"></i>
                <p>{shortenNumber(post.ups)}</p>
                <i className="fa fa-arrow-down"></i>
            </div>
            <div className="content-section">
                <div className="info">
                    <p>{`Posted by ${post.author} ${milisecondsToDate(post.created)}`}</p>
                </div>
                <div className="content">
                    <h2 className="title">{post.title}</h2>
                    {post.img ? 
                        <img src={urlFix(post.img)} onError={(e) => e.target.display = 'none'} alt="post"/> 
                        : ""}
                </div>
                <div className="content-footer">
                    <button onClick={getComments}>
                        <i class="fa fa-comments"></i>
                        {shortenNumber(post.commentCount)}
                    </button> 
                </div>
            </div>
        </div>
    )

}

export default Post