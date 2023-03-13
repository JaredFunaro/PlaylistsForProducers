import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import HomePage from './Pages/HomePage.jsx';
import UserPage from './Pages/UserPage.jsx';
import PlaylistPage from './Pages/PlaylistPage.jsx';
import SetlistPage from './Pages/SetlistPage.jsx';
import "../scss/style.scss";
// import { Route, Switch, Redirect, withRouter } from 'react-router-dom';


import Main from './Pages/Main.jsx';

// import {BrowserRouter} from 'react-router-dom'

function App() {

const [loggedIn, setLoggedIn] = useState(false);
const [playlistView, setPlaylistView] = useState(false);
const [setlistView, setSetlistView] = useState(false);
const [currentPlaylist, setCurrentPlaylist] = useState({});
const [currentSetlist, setCurrentSetlist] = useState([]);
const [currentSongs, setCurrentSongs] = useState([]);
const [accessToken, setAccessToken] = useState('');
const [playlists, setPlaylists] = useState([]);
const [userName, setUserName] = useState('ph');
const [welcomeMessage, setWelcomeMessage] = useState('');
const [overallGrade, setOverallGrade] = useState([0]);

var SpotifyWebApi = require('spotify-web-api-node');
const CLIENT_ID = '0bce542abefe4969bf7b9e854eaeb5ac';
const CLIENT_SECRET = '1a720dd106ab4f0e9d50bad70e4818d2';
const RE = 'http://localhost:3000/callback';

var spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: RE
});


  useEffect(() => {
    if (location.search) {
      setLoggedIn(true);
      let parsed = queryString.parse(location.search)
      setAccessToken(parsed.access_token)
      spotifyApi.setAccessToken(parsed.access_token);
      spotifyApi.getMe()
        .then(function(data) {
          console.log('Some information about the authenticated user', data.body);
          var thisName = data.body.display_name.toString()
          setUserName(data.body.display_name)
          setWelcomeMessage('Hello there, ' + thisName + '!')
        }, function(err) {
          console.log('Something went wrong!', err);
        });

    }
  },[])

const isUserLoggedIn = () => {
  if (loggedIn && playlistView) {
    return <PlaylistPage currentSongs={currentSongs} setCurrentSongs={setCurrentSongs} setPlaylistView={setPlaylistView} setSetlistView={setSetlistView} currentSetlist={currentSetlist} setCurrentSetlist={setCurrentSetlist} accessToken={accessToken} currentPlaylist={currentPlaylist}/>
  } else if (loggedIn && setlistView) {
    return <SetlistPage overallGrade={overallGrade} setOverallGrade={setOverallGrade} setlistView={setlistView} setCurrentSetlist={setCurrentSetlist} setPlaylistView={setPlaylistView} setSetlistView={setSetlistView} currentSetlist={currentSetlist} accessToken={accessToken}/>
  } else if (loggedIn) {
    return <UserPage currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist} setPlaylistView={setPlaylistView} playlists={playlists} setPlaylists={setPlaylists} accessToken={accessToken} userName={userName} welcomeMessage={welcomeMessage}/>
  } else {
    return <HomePage/>
  }
}

  return (
   <div className = "Main">
    {isUserLoggedIn()}
   </div>
  )
};

  export default App;

  //   return (
//    <div className = "App">
//     heyo
//     <BrowserRouter>
//     <Main/>

//     </BrowserRouter>
//    </div>
//   )
// };
