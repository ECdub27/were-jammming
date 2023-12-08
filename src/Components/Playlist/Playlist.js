import React from "react";
import { useCallback } from "react";
import './Playlist.css';
import Button from '@mui/material/Button';
import TrackList from "../TrackList/TrackList";
import { Typography } from "@mui/material";

const Playlist = (props) =>{

const handleNameChange = useCallback((event) =>{
    props.onNameChange(event.target.value);
},[props])


  return (
  <div className="Playlist-Tracks">
    <input  onChange={handleNameChange}/>
    <TrackList 
    tracks={props.playlistTracks}
    isRemoval={true}
    onRemove={props.onRemove}/>
    <Typography color='#FDB927'>
    <Button className="Spotify-save-button" variant='contained'> SAVE TO SPOTIFY

    </Button>
    </Typography>
  </div>
);
};

export default Playlist;