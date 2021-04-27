import React from 'react';
import './App.css';
import PostList from './features/PostList/PostList';
import SearchBar from './features/SearchBar/SearchBar'


function App() {
  return (
    <main className="root-body">
      <nav>
        <a href="https://reddit.com">
          <img src="https://marka-logo.com/wp-content/uploads/2020/11/Reddit-Logo.png" alt="reddit"/>
        </a>
        <SearchBar/>
      </nav>
      <PostList/>
    </main>
  );
}

export default App;
