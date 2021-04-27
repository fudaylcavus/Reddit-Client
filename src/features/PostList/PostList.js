import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Reddit from "../../app/Reddit";
import Post from "../Post/Post";
import './PostList.css'
import { addPost, selectActiveReddit, selectPosts } from "./PostListSlice";
const PostList = () => {
    const dispatch = useDispatch();
    let posts = useSelector(selectPosts);
    let activeReddit = useSelector(selectActiveReddit);

    useEffect(() => {
        Reddit.getSubredditPosts(activeReddit).then(json => {
            json.forEach(item => {
                dispatch(addPost({
                    name: item.display_name,
                    title: item.title,
                    url: item?.url,
                    id: item.id,
                    ups: item.ups,
                    author: item.author,
                    img: item.preview?.images[0]?.source?.url,
                    created: item.created,
                    permalink: item.permalink,
                    commentCount: item.num_comments,
                    comments: []
                }))
            })
        })
        
    }, [dispatch, activeReddit])

    return (
        <div className="post-area">
            {
            posts.length > 5 ? 
                posts.map((post) => {
                    return <Post post={post} isLoading={true}/>
                }) 
                : <h1 className="post">HELLO BRO</h1>
            }
        </div>
    )
}
export default PostList;