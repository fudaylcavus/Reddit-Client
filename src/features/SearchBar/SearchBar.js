import React from 'react'
import { useDispatch } from 'react-redux'
import { useRouteMatch } from 'react-router'
import { changeActiveReddit } from '../PostList/PostListSlice'
import './SearchBar.css'

const SearchBar = (props) => {
    console.log(props)
    console.log(useRouteMatch())
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        let text = document.getElementById("search").value;
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