import React, {useState, useEffect} from 'react';
import SongEntry from './SongEntry.jsx';

function PlaylistPage(props) {

  const [songs, setSongs] = useState([]);
  const [songInfo, setSongInfo] = useState([]);

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

// need to request to "https://api.spotify.com/v1/playlists/0kcBiLpI4E6KWq2xrwONv3/tracks" to get tracks

// GET /v1/playlists/playlist_id/tracks HTTP/1.1
// Content-Type: application/json
// Authorization:
// Host: api.spotify.com
var songIDs = []
var songsArray = []
var songFeaturesArray = []
useEffect(() => {

  fetch(`https://api.spotify.com/v1/playlists/${props.currentPlaylist.id}/tracks`, {
    headers: {'Authorization': 'Bearer ' + props.accessToken}
  })
  .then(response => response.json())
  .then((data) => {
    songsArray = data.items;
    console.log('these are the current songs', data.items);

    // for (var k=0; k<data.items.length; k++) {
    //   songIDs.push(data.items[k].id)
    // }
    var itemsProcessed = 0;
    data.items.forEach((item) => {
      songIDs.push(item.track.id)
      itemsProcessed++;

      if (itemsProcessed === data.items.length) {

        getFeatures();
      }
    })

  })
}, [])

function getFeatures() {
  spotifyApi.getAudioFeaturesForTracks(songIDs)
  .then(function(data) {
    console.log('this is the song info data', data)
    data.body.audio_features.forEach((song, index) => {
      songsArray[index].track.danceability = song.danceability
      songsArray[index].track.energy = song.energy
      songsArray[index].track.tempo = song.tempo
      songsArray[index].track.key = song.key

    })
    setSongs(songsArray);
    console.log('this should be all the info', songsArray);

  }, function(err) {
    console.log('Something went wrong!', err);
  })
}

const setlistClick = () => {
  props.setSetlistView(true);
  props.setPlaylistView(false);
}

const returnHome = () => {
  props.setCurrentSetlist([]);
  props.setSetlistView(false);
  props.setPlaylistView(false);

}

  return (
    <div id='songs'>

      <h1 className='text' id="playlist-name">
        <button onClick={setlistClick} id='setlist-button'>Create Setlist</button>
        {props.currentPlaylist.name}
        <button onClick={returnHome} id='home-button'>Return to Playlists</button>
        </h1>
      <div className='song-row'>
      {songs.length && songs.map((song, index) => {
        return <SongEntry currentSetlist={props.currentSetlist} setCurrentSetlist={props.setCurrentSetlist}key={index} song={song}/>
      })}
      </div>
    </div>
  )
}

export default PlaylistPage