import React from "react";
import { useCallback } from "react";
import './Playlist.css';
import TrackList from "../TrackList/TrackList";

const Playlist = (props) =>{

const handleNameChange = useCallback((event) =>{
    props.onNameChange(event.target.value);
},[props])


  return (
  <div className="Playlist Tracks">
    <input  onChange={handleNameChange}/>
    <TrackList 
    tracks={props.playlistTracks}
    isRemoval={true}
    onRemove={props.onRemove}/>
    <button className="Spotify-save-button"> SAVE TO SPOTIFY

    </button>
  </div>
);
};

export default Playlist;