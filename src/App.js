import React, { useEffect } from 'react';
import './App.css';
import PostList from './features/PostList/PostList';
import SearchBar from './features/SearchBar/SearchBar'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import SubredditList from "./features/SubredditList/SubredditList";
import './hamburgers.css'
import Post from './features/Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost } from './features/Post/PostSlice';
import { toggleDisplay as subredditToggle } from './features/SubredditList/SubredditListSlice';
import { loadPosts, selectActiveReddit } from './features/PostList/PostListSlice';

function App() {
  const post = useSelector(selectPost);
  const dispatch = useDispatch();
  let activeReddit = useSelector(selectActiveReddit);

  useEffect(() => {
    dispatch(loadPosts({ activeReddit }));
  }, [dispatch, activeReddit])

  return (
    <Router>
      <main className="App">
        <nav>
          <Link onClick={() => window.scrollTo(0, 0)}>
            <h2 style={{ fontWeight: 600, fontSize: "1.5em" }}>Reddit <span style={{ fontWeight: 400 }}>Client</span>  </h2>
          </Link>
          <SearchBar />
          <button onClick={subredditToggle} id="hamburger" className="hamburger hamburger--collapse" type="button">
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
              <Post post={post} />
            </div>
            <SubredditList />
          </Route>

        </Switch>
      </main>
    </Router>
  );
}

export default App;
