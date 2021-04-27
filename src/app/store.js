import { configureStore } from '@reduxjs/toolkit';
import searchBarReducer from '../features/SearchBar/SearchBarSlice';
import postListReducer from '../features/PostList/PostListSlice';

export const store = configureStore({
  reducer: {
    searchBar: searchBarReducer,
    postList: postListReducer
  },
});
