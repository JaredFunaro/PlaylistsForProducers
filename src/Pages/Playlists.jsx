import React from 'react';
import PlaylistEntry from './PlaylistEntry';

function Playlists(props) {


  return (
    <div id="playlists">
    {props.playlists.length > 0 && props.playlists.map((playlist, index) => {
      return (<PlaylistEntry key={index} index={index} currentPlaylist={props.currentPlaylist} setCurrentPlaylist={props.setCurrentPlaylist} setPlaylistView={props.setPlaylistView} playlist={playlist} />)
    })}
    </div>
  )
}

export default Playlists