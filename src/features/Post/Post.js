import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { secondsToDate, shortenNumber, urlFix } from '../../app/util'
import { changeActiveReddit, selectIsLoadingPosts, selectPosts } from '../PostList/PostListSlice'
import { loadComments, setPostById } from './PostSlice'
import './Post.css'
import { useEffect } from 'react'
import Comments from './Comments/Comments'

const Post = (props) => {
    const dispatch = useDispatch();
    const { post } = props;
    const posts = useSelector(selectPosts);
    const isLoading = useSelector(selectIsLoadingPosts)
    const { postId } = useParams();

    const videoToAudioUrl = url => {
        return url.replace(url.match("DASH_[0-9]*"), "DASH_audio")
    }

    //Reddit video sources not include sound
    const handleVideoPlay = () => {
        let audio = document.getElementById(post.id)
        audio.play()
    }

    const handleVideoPause = () => {
        let audio = document.getElementById(post.id)
        audio.pause()
    }

    const handleComments = () => {
        dispatch(loadComments(post.permalink))
    }

    useEffect(() => {
        if (postId) {
            dispatch(setPostById({posts, postId}))
        }
    }, [dispatch, posts, postId])

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
        <div key={post.id}>
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
                        <p>{`Posted by ${post.author || "Fudayl Cavus"} ${secondsToDate(post.created)}`}</p>
                    </div>
                    <div className="content">
                        <h2 className={styling.title}>{post.title || "Hello, nice to see you here. Probably you wanted to access a post directly. But this is not possible, please go back to homepage."}</h2>
                        {post.img ?
                            (isLoading 
                                ? "" 
                                : post.video ? ( 
                                    
                                    <div class="embed-content">
                                        <video controls onPlay={handleVideoPlay} onPause={handleVideoPause}>
                                            <source src={post.video} />
                                        </video>
                                        <audio id={post.id} src={videoToAudioUrl(post.video)}></audio>
                                    </div>

                                ): <img src={urlFix(post.img)} onError={(e) => e.target.display = 'none'} alt="post" />)
                            : ""}
                        
                    </div>
                    <div className="content-footer">
                        <Link to={postId ? "#" : `../post/${post.id}`}>
                            <button onClick={handleComments} className={styling.empty}>
                                <i className="fas fa-comment-alt"></i>
                                {isLoading ? "" :
                                    shortenNumber(post.commentCount)
                                } Comments
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            {postId ? <Comments comments={post.comments} /> : ""}
        </div>
    )

}

export default Post