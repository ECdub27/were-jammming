import React from "react";
import './SearchResults.css';
import TrackList from "../TrackList/TrackList";

const SearchResults = (props) =>{
    return (
<div>
    <h2>Results</h2>
    <TrackList onAdd={props.onAdd} track={props.searchResults}/>
</div>
    );
};


export default SearchResults;