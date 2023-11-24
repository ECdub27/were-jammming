import './App.css';
import { useState, useCallback } from 'react';
import Spotify from './Util/Spotify';
import Searchbar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';

import Playlist from './Components/Playlist/Playlist';

function App(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] =  useState('New Playlist');
  const [playlistTrack, setPlaylistTrack] = useState([]);

const search = useCallback((term) =>{
  Spotify.searchTerm(term).then(setSearchResults);
},[]);

const addTrack = useCallback((track) =>{
  if (playlistTrack.some((savedTrack) => savedTrack.id === track.id))
  return;
setPlaylistTrack((prevTracks) => [...prevTracks, track])
},[playlistTrack]);


const removeTrack = useCallback((track) => {
  setPlaylistTrack((prevTracks) =>{
    prevTracks.filter((currentTrack) => currentTrack.id !== track.id);
  })
},[])

const updatePlaylistName = useCallback((name) =>{
  setPlaylistName(name);
},[])


const savePlaylist = useCallback(() =>{
  const trackuris = playlistTrack.map((track)=> track.uri)
  Spotify.savePlaylist(playlistName, trackuris).then(() =>{
    setPlaylistName('New Playlist');
    setPlaylistTrack([]);
  });
},[playlistName, playlistTrack]);

  return (
    <div className="App">
      <h1>In the Name of Bob Marley</h1>
      
       <h2 className='h2'>We're Ja-mmmm-ing</h2>
       <p className='p-1'>Please come jam with me! </p>
       
       <Searchbar onSearch={search} onClick={search} />
       <SearchResults onAdd={addTrack} searchResults={searchResults} />
       <div className='app-playlist'>
        <Playlist playlistName={playlistName}
        onSave={savePlaylist}
        PlaylistTracks={playlistTrack}
        onAdd={addTrack}
        onRemove={removeTrack}
        onNameChange={updatePlaylistName}/>
       </div>
       
       
    </div>
  );
};

export default App;
