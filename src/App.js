import React from 'react';
import './App.css';
import PostList from './features/PostList/PostList';
import SearchBar from './features/SearchBar/SearchBar'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SubredditList from "./features/SubredditList/SubredditList";
// import Post from './features/Post/Post';
import './hamburgers.css'
import Post from './features/Post/Post';
import { useSelector } from 'react-redux';
import { selectPost } from './features/Post/PostSlice';
function App() {
  const post = useSelector(selectPost);
  return (
    <Router>
      <main className="App">
        <nav>
          <Link onClick={() => window.scrollTo(0, 0)} to="/">
            <h2 style={{ fontWeight: 600, fontSize: "1.5em" }}>Reddit <span style={{ fontWeight: 400 }}>Client</span>  </h2>
          </Link>
          <SearchBar />
          <button id="hamburger" className="hamburger hamburger--collapse" type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </nav>
        <Switch>
          <Route exact path="/(|r/):subreddit?">
            <PostList />
            <SubredditList />
          </Route>
          <Route path="/post/:postId">
            <div className="post-area">
              <Post post={post}/>
            </div>
            <SubredditList />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
