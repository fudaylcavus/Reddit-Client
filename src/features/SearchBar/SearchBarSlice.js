import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    text: ""
}

const options = {
    name: 'searchBar',
    initialState,
    reducers: {
        changeText: (state, action) => {
            state.text = action.payload
        }
    }
}

 const searchBar = createSlice(options);

 export default searchBar.reducer;
 export const { changeText } = searchBar.actions;

 export const selectText = state => state.searchBar.text;

 