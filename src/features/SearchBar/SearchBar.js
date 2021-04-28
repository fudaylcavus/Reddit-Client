import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeActiveReddit } from '../PostList/PostListSlice'
import './SearchBar.css'
import { changeText, selectText } from './SearchBarSlice'

const SearchBar = () => {

    const text = useSelector(selectText);
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        let text = document.getElementById("search").value;
        // dispatch(changeText(text))
        dispatch(changeActiveReddit(text));
    }

    return (
        <form className="searchItems" onSubmit={handleSubmit}>
            <input 
                id="search"
                className="searchBox" 
                type="text" 
                placeholder="Search for reddit"
            />
            <button className="searchButton" onClick={handleSubmit}><i className="fa fa-search"></i>  </button>
        </form>
    )
}

export default SearchBar