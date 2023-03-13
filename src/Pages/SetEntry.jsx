import React, {useState} from 'react'

function SetEntry() {
var color = 'white';
// const handleClick = (e) => {
//   console.log(e)
//   if (color === 'white') {
//     color = '#2ecbff'
//   } else {
//     color = 'white';
//   }
// }
const [classNam, setClassNam] = useState('song-entry');
const handleClick = () => {
  if (classNam === 'song-entry') {
    setClassNam('song-entry-clicked')
    // console.log('changing class name and color to red')
  } else {
    setClassNam('song-entry')
    // console.log('changing class name and color to white')
  }
}

function pitchClassToCamelot(pitchClass) {
  const camelotMap = {
    0: "8B",
    1: "3B",
    2: "10B",
    3: "5B",
    4: "12B",
    5: "7B",
    6: "2B",
    7: "9B",
    8: "4B",
    9: "11B",
    10: "6B",
    11: "1B"
  };
  return camelotMap[pitchClass];
}
let spotifyURL = song.track.external_urls.spotify
const camelot = pitchClassToCamelot(song.track.key)

// style='background-color:' {color}
  return (
    <div id={key} className={classNam}  >
      <div className='flip-container song-image'>
        <div className='flipper'>
          <div className = 'front'>
            <img className='song-image' src={song.track.album.images[0].url}/>
          </div>
          <div className='back'>
            <a href={spotifyURL} target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/1024px-Spotify_icon.svg.png?20220821125323" alt="Spotify"/></a>
          </div>
        </div>
      </div>
      <div className='song-info' onClick={handleClick}>



        <div className ='song-name-artist'>
          <div className='song-artist'>
        {song.track.artists[0].name}
          </div>
        <div className='song-name'>
        {song.track.name}
          </div>
        </div>

        <div className ='song-tempo'>
          <div className='tempo-number'>
            {Math.round(song.track.tempo)}
          </div>
          <div className='subtext'>
            Tempo
          </div>
        </div>

        <div className ='song-key'>
          <div className='key-number'>
            {song.track.key}
          </div>
          <div className='subtext'>
            Key
          </div>
        </div>

        <div className ='song-key-camelot'>
          <div className='key-camelot'>
            {camelot}
          </div>
          <div className='subtext'>
            Camelot
          </div>
        </div>

        <div className ='song-danceability'>
          <div className='dance-number'>
            {Math.round(song.track.danceability*10) + '/10'}
          </div>
          <div className='subtext'>
            Danceability
          </div>
        </div>

        <div className ='song-popularity'>
          <div className='pop-number'>
            {song.track.popularity}
          </div>
          <div className='subtext'>
            Popularity
          </div>
        </div>


      </div>

    </div>
  )
}

export default SetEntry