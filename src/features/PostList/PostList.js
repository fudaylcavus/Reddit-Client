import React, { useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post/Post";
import './PostList.css'
import { changeActiveReddit, loadPosts, selectActiveReddit, selectHasError, selectPosts } from "./PostListSlice";
const PostList = () => {
    const dispatch = useDispatch();
    let posts = useSelector(selectPosts);
    let activeReddit = useSelector(selectActiveReddit);
    const hasError = useSelector(selectHasError)
    

    let { subreddit } = useParams();

    if (subreddit) {
        dispatch(changeActiveReddit(`r/${subreddit}`))
    } else {
        dispatch(changeActiveReddit("r/popular"))
    }

    useEffect(() => {
        dispatch(loadPosts({ activeReddit }));
        
    }, [dispatch, activeReddit])

    return (
        
        <div className="post-area">
            {hasError ? (
                <div className="error">
                    <h1>AN ERROR OCCURED, SORRY!</h1>
                </div>
            ) : posts.map((post) => {
                return <Post key={post.id} post={post}/>
                })
            }
        </div>
    )
}
export default PostList;