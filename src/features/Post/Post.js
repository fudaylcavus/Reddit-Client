import { useDispatch, useSelector } from 'react-redux'
import { milisecondsToDate, shortenNumber, urlFix } from '../../app/util'
import { changeActiveReddit, loadComments, selectIsLoading } from '../PostList/PostListSlice'
import './Post.css'

const Post = (props) => {
    const dispatch = useDispatch();
    const { post } = props;
    const isLoading = useSelector(selectIsLoading)
    

    const getComments = () => {
        dispatch(loadComments({post}))
    }

    const handleSubredditChange = () => {
        document.documentElement.scrollTop = 0;
        dispatch(changeActiveReddit(post.subredditName))
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
                <p className={styling.empty}>{shortenNumber(post.ups)}</p>
                <i className="fa fa-arrow-down"></i>
            </div>
            <div className="content-section">
                <div className={styling.info}>
                    <p><span onClick={handleSubredditChange} class="subreddit">{post.subredditName}</span> {`Posted by ${post.author || ""} ${milisecondsToDate(post.created)}`}</p>
                </div>
                <div className="content">
                    <h2 className={styling.title}>{post.title || "hello man, nice to see you here."}</h2>
                    {post.img ? 
                        (isLoading ? "" : <img src={urlFix(post.img)} onError={(e) => e.target.display = 'none'} alt="post"/> )
                        : ""}
                </div>
                <div className="content-footer">
                        
                        <button className={styling.empty} onClick={getComments}>
                            <i class="fas fa-comment-alt"></i>
                            {isLoading ? "" :
                                shortenNumber(post.commentCount)
                            } Comments
                        </button>  
                    
                </div>
            </div>
        </div>
    )

}

export default Post