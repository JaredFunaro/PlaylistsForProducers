import React from 'react';


function PlaylistEntry(props) {

function handleClick() {
  props.setPlaylistView(true)
  props.setCurrentPlaylist(props.playlist)
}

if (props.playlist.name.length > 0) {
  var shortenedName = props.playlist.name;
  if (props.playlist.name.length > 0 && props.playlist.name.length > 20) {
    shortenedName = props.playlist.name.slice(0,20)+ '...'
    if (props.playlist.name.length > 30) {
    props.playlist.name = props.playlist.name.slice(0,35) + '...';
    }
  }
}

  return (
    <div onClick={handleClick} className='playlist'>
      <div className='img-cont'>
        <img className='image' src={props.playlist.images[0].url}/>

      </div>
    <div className='playlist-name'>

    {shortenedName}
    </div>
    </div>
  )
}

export default PlaylistEntry