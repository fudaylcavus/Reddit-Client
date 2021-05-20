import React from "react";
import { useSelector} from "react-redux";
import Post from "../Post/Post";
import './PostList.css'
import {  selectHasErrorPosts, selectIsLoadingPosts, selectPosts } from "./PostListSlice";
import { selectText } from "../SearchBar/SearchBarSlice";

const PostList = () => {
    let posts = useSelector(selectPosts);
    const hasError = useSelector(selectHasErrorPosts)
    const inputText = useSelector(selectText)
    const isLoading = useSelector(selectIsLoadingPosts)
    
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