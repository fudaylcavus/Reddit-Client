import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Reddit from "../../app/Reddit"

const initialState = {
    id: 0,
    permalink: "",
    comments: []
}

export const loadComments = createAsyncThunk(
    'loadComments',
    async ({post}, {dispatch}) => {
        let comments = []
        await Reddit.getPostComments(post.permalink).then(data => {
            data.forEach( comment => {
                comments.push({
                    author: comment.author,
                    content: comment.body,
                    created: comment.created,
                    replies: comment.replies?.data?.children
                })
            })
        })
        dispatch(setCommands({id: post.id, comments}))
    }
)


const options = {
    name: 'post',
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.comments.push(action.payload)
        },
        setCommands: (state, action) => {
            state.comments = action.payload;
        }
    }
}

const post = createSlice(options);
export const { addComment, setCommands } = post.actions;
export const selectComments = state => state.post.comments;
export default post.reducer;
