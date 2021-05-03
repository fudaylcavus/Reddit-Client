import React, { useEffect, useRef } from "react";
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import Post from "../Post/Post";
import './PostList.css'
import { changeActiveReddit, loadPosts, selectActiveReddit, selectHasErrorPosts, selectIsLoadingPosts, selectPosts } from "./PostListSlice";
import { selectText } from "../SearchBar/SearchBarSlice";

const PostList = () => {
    const dispatch = useDispatch();
    let posts = useSelector(selectPosts);
    let activeReddit = useSelector(selectActiveReddit);
    const hasError = useSelector(selectHasErrorPosts)
    const inputText = useSelector(selectText)
    const isLoading = useSelector(selectIsLoadingPosts)
    let { subreddit } = useParams();
    let activeRedditRef = useRef(activeReddit)

    if (subreddit) {
        dispatch(changeActiveReddit(`r/${subreddit}`))
    }

    useEffect(() => {
        dispatch(loadPosts({ activeReddit }));
    }, [dispatch, activeReddit])

    return (

        <div className="post-area">
            { hasError ? (
                <div
                    style={
                        { display: "flex", 
                        justifyContent: "center", 
                        justifyItems: "stretch",
                        alignItems: "center", 
                        marginTop: "20%",
                    }}
                >
                    <h3 style={{padding: "3em"}} className="error">AN ERROR OCCURED</h3>
                </div>
            ) : posts.filter(post => {
                return isLoading
                    ? post
                    : post.title?.toLowerCase().includes(inputText.toLowerCase())
            }).map((post) => {
                return <Post key={post.id} post={post} />
            })
            }
        </div>
    )
}

export default PostList;