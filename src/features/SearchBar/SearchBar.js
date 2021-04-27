import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './SearchBar.css'
import { changeText, selectText } from './SearchBarSlice'

const SearchBar = () => {

    const text = useSelector(selectText);
    console.log(text)
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        let text = document.getElementById("search").value;
        console.log(text);
        dispatch(changeText(text))
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