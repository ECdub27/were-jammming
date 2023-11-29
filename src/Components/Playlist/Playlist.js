import React from "react";
import { useCallback } from "react";
import './Playlist.css';
import Button from '@mui/material/Button';
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
    <Button className="Spotify-save-button" variant='contained'> SAVE TO SPOTIFY

    </Button>
  </div>
);
};

export default Playlist;