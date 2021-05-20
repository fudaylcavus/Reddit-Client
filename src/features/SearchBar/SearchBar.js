import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveReddit, selectActiveReddit } from '../PostList/PostListSlice'
import './SearchBar.css'
import { changeText, selectText } from './SearchBarSlice'

const SearchBar = (props) => {
    const dispatch = useDispatch()
    const activeReddit = useSelector(selectActiveReddit)
    const text = useSelector(selectText)

    useEffect(() => {
        dispatch(changeText(""))
    }, [dispatch, activeReddit])


    const handleInputChange = (e) => {
        e.preventDefault()
        let text = document.getElementById("search").value;
        dispatch(changeText(text));
    }
    
    const handleRedditChange = () => {
        if (text.includes('r/')) {
            dispatch(changeActiveReddit(text))
        } else {
            dispatch(changeActiveReddit(`r/${text}`));
        }
    }

    return (
        <form className="searchItems" onSubmit={(e) => {e.preventDefault(); handleRedditChange()}}>
                <input 
                    id="search"
                    value={text}
                    className="searchBox" 
                    type="text" 
                    placeholder="Search post or change subreddit"
                    onChange={handleInputChange}
                />
                <button className="searchButton" ><i className="fa fa-search"></i></button>
        </form>
    )
}

export default SearchBar