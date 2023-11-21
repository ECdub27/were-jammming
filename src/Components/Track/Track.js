import React from "react";
import './Track.css';
import { useCallback } from "react";


const Track = (props) =>{
// add track 
const {track, onRemove} = props;
const addTrack = useCallback((event) =>{
    props.onAdd(props.track);
},
[props]);

// remove track 
const removeTrack = useCallback((event) =>{
    props.onRemove(props.track);
},
[props])

const renderAction = () =>{
    if(props.onRemove){
     return <button className="track-action" onClick={removeTrack}>
       - 
     </button>
    } 
    return <button className="track-action" onClick={addTrack}>+</button>
}


return (
    <div className="Track">
        <div className="Track-information">
            <h3 className="track-title"> {props.track.name} </h3>
            <p className="track-artist/name">{props.track.artist} || {props.track.album}</p>
        </div>
        {renderAction()}
    </div>
);
}


export default Track;