import React, { useState } from 'react';
import SongEntry from './SongEntry.jsx';

const SetlistPage = (props) => {



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

// spotifyApi.getAudioFeaturesForTracks(props.currentSetlist)
// .then(function(data) {
//   setTheseSongs(data.body);
//   console.log(data.body);
// }, function(err) {
//   console.log(err);
// })



const setlistClick = () => {
  let playlistName = window.prompt('Please enter playlist name');
  spotifyApi.createPlaylist(playlistName, {'description': 'New Setlist', 'public':true})
  .then(function(data) {
    console.log('created playlist')
  }, function(err) {
    console.log('Something went wrong');
  })
}

const returnHome = () => {
  props.setCurrentSetlist([]);
  props.setSetlistView(false);
  props.setPlaylistView(false);

}

const gradeFunc = () => {
  if (props.overallGrade) {
    let sum = 0;
    for (var i = 0; i<props.overallGrade.length; i++ ) {
      sum += props.overallGrade[i];
    }
    return Math.round(sum / (props.overallGrade.length - 1));
  } else {
    return null;
  }
}


console.log('this is the current set list', props.currentSetlist);
  return (
    <div id='songs'>

      <h1 className='text' id="playlist-name">
        <button onClick={setlistClick} id='setlist-button'>Send To Spotify</button>
        Your Created Setlist
        <button onClick={returnHome} id='home-button'>Return to Playlists</button>
        </h1>
      <div className='song-row'>
      {props.currentSetlist.length && props.currentSetlist.map((song, index) => {
        return <SongEntry overallGrade={props.overallGrade} setOverallGrade={props.setOverallGrade} setlistView={props.setlistView} currentSetlist={props.currentSetlist} setCurrentSetlist={props.setCurrentSetlist}key={index} index={index} song={song}/>
      })}
      </div>
      <div>
      {/* {gradeFunc()} */}
      </div>
    </div>
  )
}

export default SetlistPage