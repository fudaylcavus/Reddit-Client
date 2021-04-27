import React from 'react';
import './App.css';
import PostList from './features/PostList/PostList';
import SearchBar from './features/SearchBar/SearchBar'


function App() {
  return (
    <main className="root-body">
      <nav>
        <a href="https://reddit.com">
          <img src="https://www.vectorico.com/download/social_media/Reddit-Icon.png" alt="reddit" width="50px" height="50px" />
        </a>
        <SearchBar/>
      </nav>
      <PostList/>
    </main>
  );
}

export default App;
