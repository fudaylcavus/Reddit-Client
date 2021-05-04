import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Reddit from "../../app/Reddit"

const initialState = {
    comments: [
        {author: "fudaylcavus", body: "You can add me friend on github", id:1},
        {author: "Fudayl Cavus", body: "You can add me friend on linkedin", id:2},
        {author: "fudaylcavus", body: "You can add me friend on instagram", id:3},
        {author: "Fudayl Cavus#5338", body: "You can add me friend on discord", id:4}],
    isLoadingComments: false,
    hasErrorComments: false
};

export const loadComments = createAsyncThunk(
    'loadComments',
    async (permalink) => {
        let comments = []
        await Reddit.getPostComments(permalink).then(data => {
            data.forEach( comment => {
                comments.push({
                    author: comment.author,
                    body: comment.body,
                    created: comment.created,
                    replies: comment.replies?.data?.children,
                    id: comment.id
                })
            })
        })
        return comments;
    }
)


const options = {
    name: 'post',
    initialState,
    reducers: {
        setPostById: (state, action) => {           
            const post = action.payload.posts.find( post => {
                return post.id === action.payload.postId;
            })
            Object.assign(state, post);
        }
    },
    extraReducers: {
        [loadComments.pending]: (state) => {
            state.isLoadingComments = true;
            state.hasErrorComments = false;
        },
        [loadComments.rejected]: state => {
            state.isLoadingComments = false;
            state.hasErrorComments = true;
        },
        [loadComments.fulfilled]: (state, action) => {
            window.scrollTo(0, 0);
            state.isLoadingComments = false;
            state.hasErrorComments = false;
            state.comments = action.payload;
        }
    }
}

const post = createSlice(options);
export const { setPostById } = post.actions;
export const selectPost = state => state.post;
export default post.reducer;
