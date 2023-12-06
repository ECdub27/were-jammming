import React from "react";
import './SearchResults.css';
import TrackList from "../TrackList/TrackList";

const SearchResults = (props) =>{
    return (
<div className="searchResults">
    <h2 className="results-heading">Results</h2>
    <TrackList onAdd={props.onAdd} track={props.searchResults}/>
</div>
    );
};


export default SearchResults;