import './App.css';
import { useState, useCallback } from 'react';
import Spotify from './Util/Spotify';
import Searchbar from './Components/SearchBar/SearchBar';
import SearchResults from './Components/SearchResults/SearchResults';
import { Box, Typography } from '@mui/material';
import Playlist from './Components/Playlist/Playlist';
import images from './Util/images';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

function App() {
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
  const trackuris = playlistTrack.map((track)=> track.uri);
  Spotify.savePlaylist(playlistName, trackuris).then(() =>{
    setPlaylistName('New Playlist');
    setPlaylistTrack([]);
  });
},[playlistName, playlistTrack]);

  return (
    <div className="App">
      <Box backgroundColor=''>
        <Typography fontFamily='League Spartan'>
      <h1>In the Name of Bob Marley</h1>
      
       <h2 className='h2'>We're Ja-mmmm-ing</h2>
       <p className='p-1'>Please come jam with me! </p>
       </Typography>
       </Box>
       <Searchbar onSearch={search}  />
       <SearchResults onAdd={addTrack} searchResults={searchResults} />
       <div className='app-playlist'>
        <Playlist playlistName={playlistName}
        onSave={savePlaylist}
        PlaylistTracks={playlistTrack}
        onAdd={addTrack}
        onRemove={removeTrack}
        onNameChange={updatePlaylistName}/>

        <ImageList>
          {images.map((pic) => (
            <ImageListItem>

            </ImageListItem>
          ))}
        </ImageList>
       </div>
       
       
    </div>
  );
};

export default App;
