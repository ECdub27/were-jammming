import logo from './logo.svg';
import './App.css';
import { useState, useCallback } from 'react';
import Spotify from './Util/Spotify';
import Searchbar from './Components/SearchBar/SearchBar';
import searchResults from './Components/SearchResults/SearchResults';
import SearchResults from './Components/SearchResults/SearchResults';
import Track from './Components/Track/Track';
import TrackList from './Components/TrackList/TrackList';

function App() {
  const [searchResults, setSearchResults] = useState('');
  const [playlistName, setPlaylistName] =  useState([]);
  const [playlistTrack, setPlaylistTrack] = useState('');
  return (
    <div className="App">
      <h1>In the Name of Bob Marley</h1>
      <section>
       <h2>We're Ja <span>mmmm</span>ing</h2>
       <p>Please come jam with me! </p>

       <Searchbar />
       <SearchResults />
       <div className='app-playlist'>
        <Track/>
        <TrackList/>

       </div>
       </section>
       
    </div>
  );
}

export default App;
