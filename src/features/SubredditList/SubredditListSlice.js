import Reddit from "../../app/Reddit"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
    subreddits: [{},{},{},{},{},{}],
    isLoadingSubreddits: false,
    hasErrorSubreddits: false
}

export const loadSubreddits = createAsyncThunk(
    'sublistLoad',
    async () => {
        let subredditsFulldata = await Reddit.getSubreddits()
        let subreddits = []
        subredditsFulldata.forEach(subreddit => {
            let data = {
                display_name_prefixed: subreddit.display_name_prefixed,
                id: subreddit.id,
                icon: subreddit.icon_img
            }
            subreddits.push(data);
        })
        return (subreddits)
    }
)

const options = {
    name: 'subredditList',
    initialState,
    reducers: {
        setSubreddits: (state, action) => {
            state.subreddits = action.payload
        }
    },
    extraReducers: {
        [loadSubreddits.pending]:  state => {
            state.isLoadingSubreddits = true;
            state.hasErrorSubreddits = false;
        },
        [loadSubreddits.rejected]: state => {
            state.isLoadingSubreddits = false;
            state.hasErrorSubreddits = true;
        },
        [loadSubreddits.fulfilled]: (state, action) => {
            state.isLoadingSubreddits = false;
            state.hasErrorSubreddits = false;
            state.subreddits = action.payload
        }
    }
}

const subredditList = createSlice(options)

export default subredditList.reducer
export const { setSubreddits } = subredditList.actions
export const selectSubreddits = state => state.subredditList.subreddits