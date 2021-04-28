import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Reddit from "../../app/Reddit";

const initialState = {
    //initial loading posts
    posts: [{},{},{}, {},{},{}],
    activeReddit: "r/popular",
    isLoading: false,
    hasError: false
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
                    img: item.preview?.images[0]?.source?.url,
                    created: item.created,
                    permalink: item.permalink,
                    commentCount: item.num_comments,
                    comments: []
                })
            })
        })
        dispatch(removePosts)
        dispatch(addPosts(posts))
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
        [loadPosts.fulfilled]: (state) => {
            state.isLoading = false;
            state.hasError = false;
        },
        [loadPosts.rejected]: (state) => {
            state.isLoading = false;
            state.hasError = true;
        },
        [loadPosts.pending]: (state) => {
            state.isLoading = true;
            state.hasError = false;
        }
    }
}

const postlist = createSlice(options)
export const selectIsLoading = state => state.postList.isLoading
export const selectActiveReddit = state => state.postList.activeReddit
export const selectPosts = state => state.postList.posts
export default postlist.reducer;
export const { addPost, addPosts, removePosts, changeActiveReddit } = postlist.actions;