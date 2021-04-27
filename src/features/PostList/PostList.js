import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Reddit from "../../app/Reddit";
import Post from "../Post/Post";
import './PostList.css'
import { addPost, selectPosts } from "./PostListSlice";
const PostList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectPosts);
    
    useEffect(() => {
        Reddit.getSubredditPosts('r/popular').then(json => {
            json.forEach(item => {
                dispatch(addPost({
                    name: item.display_name,
                    title: item.title,
                    url: item?.url,
                    id: item.id,
                    ups: item.ups,
                    author: item.author,
                    img: item.preview?.images[0]?.source?.url,
                    created: item.created
                }))
            })
        })
    }, [])

    return (
        <div className="post-area">
            {posts.map( (post, index) => {
                return <Post post={post}/>
            })}
        </div>
        
    )
}
export default PostList;