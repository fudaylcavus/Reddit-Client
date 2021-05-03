import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { secondsToDate, shortenNumber, urlFix } from '../../app/util'
import { changeActiveReddit, selectIsLoadingPosts, selectPosts } from '../PostList/PostListSlice'
import { loadComments, setPostById } from './PostSlice'
import './Post.css'
import { useEffect } from 'react'

const Post = (props) => {
    const dispatch = useDispatch();
    const { post } = props;
    const posts = useSelector(selectPosts);
    const isLoading = useSelector(selectIsLoadingPosts)
    const { postId } = useParams();

    

    const handlePostPage = () => {
        dispatch(setPostById({posts, postId}))
        dispatch(loadComments(post.permalink))
    }

    useEffect(() => {
        if (postId) {
            handlePostPage();
        }
    }, [postId])

    const handleSubredditChange = () => {
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
                    <p onClick={handleSubredditChange} className="subreddit">
                        <Link to={`../${post.subredditName}` || "#"}>
                            {post.subredditName}
                        </Link>
                    </p>
                    <p>{`Posted by ${post.author || ""} ${secondsToDate(post.created)}`}</p>
                </div>
                <div className="content">
                    <h2 className={styling.title}>{post.title || "hello man, nice to see you here."}</h2>
                    {post.img ?
                        (isLoading ? "" : <img src={urlFix(post.img)} onError={(e) => e.target.display = 'none'} alt="post" />)
                        : ""}
                </div>
                <div className="content-footer">
                    <Link to={postId ? "#" : `../post/${post.id}`}>
                        <button className={styling.empty}>
                            <i className="fas fa-comment-alt"></i>
                            {isLoading ? "" :
                                shortenNumber(post.commentCount)
                            } Comments
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )

}

export default Post