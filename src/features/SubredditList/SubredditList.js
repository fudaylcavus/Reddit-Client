import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import "./SubredditList.css";
import { hasErrorSubreddits, isLoadingSubreddits, loadSubreddits, selectSubreddits } from "./SubredditListSlice";

const SubredditList = () => {
  const subreddits = useSelector(selectSubreddits);
  const dispatch = useDispatch();
  const { url } = useRouteMatch();
  const isLoading = useSelector(isLoadingSubreddits)
  const hasError = useSelector(hasErrorSubreddits)

  useEffect(() => {
    dispatch(loadSubreddits());
  }, [dispatch]);

  return (
    <div id="sublist" className="subreddit-list">
      <div className="header">
        <h2 className="title">Subreddit List</h2>
      </div>
      {hasError 
      ? (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <h3 className="error">AN ERROR OCCURED</h3>
        </div>
      )
      : subreddits.map((subreddit) => {
          return (
            <Link to={`../${subreddit.display_name_prefixed}` || "#"}>
              <div
                key={subreddit.id}
                className={`subreddit-item${
                  url === "/" + subreddit.display_name_prefixed
                    ? " selected-subreddit"
                    : ""
                }`}
              >
                {subreddit.icon ? (
                  <img src={subreddit.icon} alt="subreddit" />
                ) : (
                  <div>
                    <i className="fab fa-reddit"></i>
                  </div>
                )}
                <h3 className={isLoading ? "loading" : ""}>{subreddit.display_name_prefixed || "SUBREDDIT NAME HERE"}</h3>
              </div>
            </Link>
          );
        })
      }
    </div>
  );
};

export default SubredditList;
