import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    activeReddit: "r/popular"
}


const options = {
    name: 'postList',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        addPosts: (state, action) => {
            state.posts = action.payload
        }
    }
}

const postlist = createSlice(options)

export const selectActiveReddit = state => state.postList.activeReddit
export const selectPosts = state => state.postList.posts
export default postlist.reducer;
export const { addPost, addPosts } = postlist.actions;