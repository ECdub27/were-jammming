const clientId = '436b905ebd2b4771a146e5826f839a6f'; // enter client id here
const redirectUri = 'http://localhost:3000/'; // https://localhost:3000/
let accessToken;


const Spotify = {

getAccessToken(){
    if(accessToken){
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
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
},
 searchTerm(term){
        const accessToken = Spotify.getAccessToken();
      //  const url1 = 'https://api.spotify.com/v1/me'
        const url = 'https://spotify23.p.rapidapi.com/search/?q=%60%24%7Bterm%7D%60&type=multi&offset=0&limit=10&numberOfTopResults=5';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd8488f23c0msh87fc82cac08b614p14a945jsn0d879d59d146',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
        Authorization: `Bearer ${accessToken}`
	}
};
        return fetch(url, options).then(response => {
            return response.json();
        }).then(jsonResponse => {
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

    async savePlaylist(name, trackUris){
        const url = 'https://spotify23.p.rapidapi.com/search/?q=%60%24%7Bterm%7D%60&type=multi&offset=0&limit=10&numberOfTopResults=5';
        if(!name || trackUris){
            return;
        }
        const accessToken = Spotify.getAccessToken();
        const headers = {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'd8488f23c0msh87fc82cac08b614p14a945jsn0d879d59d146',
            'X-RapidAPI-Host': 'SpotifyUserAPIserg-osipchukV1.p.rapidapi.com',
            Auhorization: `Bearer ${accessToken}`,
            body: new URLSearchParams({
                code: '<REQUIRED>',
                redirect_uri: '<REQUIRED>'
            })
            
        };
        let userId;
        return await fetch(url, {headers: headers}).then(response =>{
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
