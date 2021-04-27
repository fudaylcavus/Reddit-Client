import { configureStore } from '@reduxjs/toolkit';
import searchBarReducer from '../features/SearchBar/SearchBarSlice';
import postListReducer from '../features/PostList/PostListSlice';
import postReducer from '../features/Post/PostSlice'
export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    postList: postListReducer,
    post: postReducer
  },
});
