import React from 'react';
import './App.css';
import PostList from './features/PostList/PostList';
import SearchBar from './features/SearchBar/SearchBar'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
// import Post from './features/Post/Post';

function App() {
  
  return (
    <Router>
      <main className="root-body">
        <nav>
          <Link to="/">
            <img src="https://marka-logo.com/wp-content/uploads/2020/11/Reddit-Logo.png" alt="reddit"/>
          </Link>
          <SearchBar/>
        </nav>
        <Switch>
          <Route exact path="/(|r/):subreddit?">
            <PostList/>
          </Route>
          {/* <Route path="/:">
            <Post />
          </Route> */}
        </Switch>
      </main>
    </Router>
  );
}

export default App;
