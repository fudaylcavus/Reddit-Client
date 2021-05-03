import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Reddit from "../../app/Reddit"

const initialState = {
    comments: [],
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
                    content: comment.body,
                    created: comment.created,
                    replies: comment.replies?.data?.children
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
