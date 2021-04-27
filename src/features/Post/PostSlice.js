import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    comments: []
}

const options = {
    name: 'post',
    initialState,
    reducers: {
        addComment: (state, action) => {
            state.comments.push(action.payload)
        }
    }
}

const post = createSlice(options);
export const { addComment } = post.actions;
export const selectComments = state => state.post.comments;
export default post.reducer;
