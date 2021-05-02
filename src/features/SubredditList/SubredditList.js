import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './SubredditList.css'
import { loadSubreddits, selectSubreddits } from './SubredditListSlice';
const SubredditList = () => {

    const subreddits = useSelector(selectSubreddits)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSubreddits())
    }, [dispatch])


    return (
        <div className="subreddit-list">
            <div className="header">
                <h2 className="title">Subreddit List</h2>
                {subreddits.map(subreddit => {
                    return (
                        <div key={subreddit.id} className="subreddit-item">
                            {subreddit.icon ? <img src={subreddit.icon} alt="subreddit" /> 
                            : (
                                <div>
                                    <i class="fab fa-reddit"></i>
                                </div> 
                            )
                            }
                            <h3>{subreddit.display_name_prefixed}</h3>
                        </div>
                    )
                })

                }
            </div>
        </div>
    )
}

export default SubredditList;