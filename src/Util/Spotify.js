import { api_key } from "../config";

const clientId = '436b905ebd2b4771a146e5826f839a6f'; // enter client id here
const redirectUri = 'http://localhost:3000/'; // https://localhost:3000/
let accessToken;


const Spotify = {

getAccessToken(){
    if(accessToken){
        console.log(accessToken)
        return accessToken;
    }
    const accessTokenMatch = window.location.href.match('/access_token=([^&]*)/');
    const expiresInMatch = window.location.href.match('/expires_in=([^&]*)/');
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
      return accessToken;
    } else {
      const accessUrl = 'spotify117.p.rapidapi.com';
      window.location = accessUrl;
    }
},
 searchTerm(term){
        const accessToken = Spotify.getAccessToken();
        console.log(accessToken);
      //  const url1 = 'https://api.spotify.com/v1/me'
      const url = 'https://spotify117.p.rapidapi.com/search/?keyword=https%3A%2F%2Fopen.spotify.com%2Fsearch&type=track';
      const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': `${api_key}`,
		'X-RapidAPI-Host': 'spotify117.p.rapidapi.com',
        Authorization: `Bearer ${accessToken}`
	}
};
        return fetch(url, options).then(response => {
            return response.json();
        }).then(jsonResponse => {
            console.log(jsonResponse)
            if(!jsonResponse.tracks){
                return [];
                
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                uri: track.uri
            }));
            
        });
     
    },

    savePlaylist(name, trackUris){
const url = 'https://spotify117.p.rapidapi.com/search/?keyword=https%3A%2F%2Fopen.spotify.com%2Fsearch&type=track';
        if(!name || trackUris){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            'X-RapidAPI-Key': `${api_key}`,
            'X-RapidAPI-Host': 'spotify117.p.rapidapi.com',
            Auhorization: `Bearer ${accessToken}`,
            };
            let userId;
        return fetch(url, {headers: headers}).then(response =>{
            return response.json();
        }).then(json => {
            
            userId = json.id
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,{
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            })
        }).then(response =>{
            response.json();
        }).then(jsonResponse =>{
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackUris})
            });
        });
        },
    };








export default Spotify;
