import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post/Post";
import './PostList.css'
import { loadPosts, selectActiveReddit, selectPosts } from "./PostListSlice";
const PostList = () => {
    const dispatch = useDispatch();
    let posts = useSelector(selectPosts);
    let activeReddit = useSelector(selectActiveReddit);

    useEffect(() => {
        dispatch(loadPosts({activeReddit}));
        
    }, [dispatch, activeReddit])

    return (
        <div className="post-area">
            {
            posts.length ? 
                posts.map((post) => {
                    return <Post post={post}/>
                }) 
                : ""
            }
        </div>
    )
}
export default PostList;