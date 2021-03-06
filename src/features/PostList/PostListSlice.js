import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../app/Reddit";
import { toggleDisplay as sublistDisplay } from "../SubredditList/SubredditListSlice";

const initialState = {
    //for loading posts effect
    posts: [{},{},{}, {},{},{}],
    activeReddit: "",
    isLoadingPosts: false,
    hasErrorPosts: false
}

export const loadPosts = createAsyncThunk(
    'loadPosts',
    async ({ activeReddit }, { dispatch }) => {
        let posts = []
        await Reddit.getSubredditPosts(activeReddit).then(json => {
            json.forEach(item => {
                posts.push({
                    name: item.display_name,
                    title: item.title,
                    url: item?.url,
                    id: item.id,
                    ups: item.ups,
                    author: item.author,
                    subredditName: item.subreddit_name_prefixed,
                    img: item.preview?.images[0]?.source?.url,
                    created: item.created_utc,
                    permalink: item.permalink,
                    commentCount: item.num_comments,
                    selftext: item.selftext,
                    video: item?.secure_media?.reddit_video?.fallback_url,
                })
            })
        })
        dispatch(removePosts)
        return posts;
    }
)

const options = {
    name: 'postList',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        addPosts: (state, action) => {
            state.posts = action.payload
        },
        removePosts: (state) => {
            state.posts = []
        },
        changeActiveReddit: (state, action) => {
            state.activeReddit = action.payload
        }
    },
    extraReducers: {
        [loadPosts.fulfilled]: (state, action) => {
            window.scrollTo(0,0);
            state.isLoadingPosts = false;
            state.hasErrorPosts = false;
            state.posts = action.payload
        },
        [loadPosts.rejected]: (state) => {
            state.isLoadingPosts = false;
            state.hasErrorPosts = true;
        },
        [loadPosts.pending]: (state) => {
            sublistDisplay("off");
            state.isLoadingPosts = true;
            state.hasErrorPosts = false;
        }
    }
}

const postlist = createSlice(options)
export const selectIsLoadingPosts = state => state.postList.isLoadingPosts
export const selectHasErrorPosts = state => state.postList.hasErrorPosts
export const selectActiveReddit = state => state.postList.activeReddit
export const selectPosts = state => state.postList.posts
export default postlist.reducer;
export const { 
    addPost, 
    addPosts, 
    removePosts, 
    changeActiveReddit } = postlist.actions;