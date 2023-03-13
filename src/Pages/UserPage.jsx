import React, {useState, useEffect} from 'react';
import Playlists from './Playlists.jsx';
import { useParams } from 'react-router-dom';

function UserPage(props) {


const [useEffectTrigger, setUseEffectTrigger] = useState(false);


//SETTING UP FOR API FETCHES
var SpotifyWebApi = require('spotify-web-api-node');
const CLIENT_ID = '0bce542abefe4969bf7b9e854eaeb5ac';
const CLIENT_SECRET = '1a720dd106ab4f0e9d50bad70e4818d2'
const RE = 'http://localhost:3000/callback'
var spotifyApi = new SpotifyWebApi({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: RE
});
spotifyApi.setAccessToken(props.accessToken);

//GREETING ANIMATION
var i = 0;
function typeWriter() {
  var text = props.welcomeMessage;
    if (i < text.length) {
      document.getElementById("demo").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);

    }

  }

var j = 0;
function typeWriter2() {
  var text2 = 'Pick a playlist to get started...'
    if (j < text2.length) {
      document.getElementById("demo2").innerHTML += text2.charAt(j);
      j++;
      setTimeout(typeWriter2, 50);

    }

  }

useEffect(() => {

  if (props.userName !== 'ph') {
    spotifyApi.getUserPlaylists(props.userName)
      .then(function(data) {
        console.log('should be invoking the second typeWriter function')
        console.log('this is the playlist data', data);
        props.setPlaylists(data.body.items);
        typeWriter();
        setTimeout(typeWriter2, 2000);
      }), function (err) {
        console.log('error fetching user playlist', err);
      }
  }
}, [props.userName])




var playlistData = [];


return (

<div id='UserPage'>

<h1 className='text' id='demo' ></h1>
<h3 className='text' id='demo2'></h3>
<Playlists playlists={props.playlists} currentPlaylist={props.currentPlaylist} setCurrentPlaylist={props.setCurrentPlaylist} setPlaylistView={props.setPlaylistView}/>

</div>

);

}

export default UserPage