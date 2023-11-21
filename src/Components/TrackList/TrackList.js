import React from "react";
import Track from "../Track/Track";
import './TrackList.css';


const TrackList = (props) =>{
return (
    <div className="Track-list">
        { props.track && props.track.map((track) =>{
            return (
                
                <Track 
        onAdd={props.onAdd}
        onRemove={props.onRemove}
        track={track}
        key={track.id} 
        isRemoval={props.onRemoval}/>
            )
        })}
        
    </div>
);
};


export default TrackList;