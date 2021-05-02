import React from 'react';
import './App.css';
import PostList from './features/PostList/PostList';
import SearchBar from './features/SearchBar/SearchBar'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SubredditList from "./features/SubredditList/SubredditList";
// import Post from './features/Post/Post';
import './hamburgers.css'
function App() {
  
  return (
    <Router>
      <main className="App">
        <nav>
          <Link to="/">
            {/* <img src="https://marka-logo.com/wp-content/uploads/2020/11/Reddit-Logo.png" alt="reddit"/> */}
            <h2 style={{fontWeight: 600, fontSize: "1.5em"}}>Reddit <span style={{fontWeight: 400}}>Client</span>  </h2>
          </Link>
          <SearchBar/>
          <button id="hamburger" className="hamburger hamburger--collapse" type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </nav>
        <Switch>
          <Route exact path="/(|r/):subreddit?">
            <PostList/>
            <SubredditList/>
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
