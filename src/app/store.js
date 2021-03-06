import { configureStore } from '@reduxjs/toolkit';
import searchBarReducer from '../features/SearchBar/SearchBarSlice';
import postListReducer from '../features/PostList/PostListSlice';
import postReducer from '../features/Post/PostSlice'
import subredditListReducer from '../features/SubredditList/SubredditListSlice'


export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    postList: postListReducer,
    post: postReducer,
    subredditList: subredditListReducer
  },
});
