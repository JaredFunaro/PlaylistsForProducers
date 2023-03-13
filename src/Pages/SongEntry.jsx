import React, {useState, useEffect} from 'react'

function SongEntry({overallGrade, setOverallGrade, setlistView, currentSongs, setCurrentSongs, currentSetlist, setCurrentSetlist, index, song, key}) {
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
//song.track.id
  if (currentSetlist.includes(song)) {
    const updatedElements = currentSetlist.filter(id => id !== song);
    console.log(updatedElements)
    setCurrentSetlist(updatedElements);

    // const updatedSongs = currentSongs.filter(song => song !== song.track);
    // console.log(updatedSongs)
    // setCurrentSongs(updatedSongs);
  } else {
    // Otherwise, add it to the end of the array
    const updatedElements = [...currentSetlist, song];
    console.log(updatedElements)
    setCurrentSetlist(updatedElements);

    // const updatedSongs = [...currentSongs, song.track];
    // console.log(updatedSongs)
    // setCurrentSongs(updatedSongs);
  }

  // if (currentSetlist.includes(song.track)) {

  // } else {
  //   // Otherwise, add it to the end of the array

  // }

  if (classNam === 'song-entry') {
    if (!setlistView) {

      setClassNam('song-entry-clicked')
    }
    // console.log('changing class name and color to red')
  } else {
    if (!setlistView) {
    setClassNam('song-entry')
    }
    // console.log('changing class name and color to white')
  }
}

function pitchClassToCamelot(pitchClass) {
  const camelotMap = {
    0: "8",
    1: "3",
    2: "10",
    3: "5",
    4: "12",
    5: "7",
    6: "2",
    7: "9",
    8: "4",
    9: "11",
    10: "6",
    11: "1"
  };
  return camelotMap[pitchClass];
}
let spotifyURL = song.track.external_urls.spotify
const camelot = pitchClassToCamelot(song.track.key)



// useEffect(() => {
//   if (currentSetlist[index+1] === undefined) {
//     return null;
//   }
//   let grade = 100;
//   let camelotDifference = (Math.abs(Math.abs(Number(camelot)-6))-Math.abs((Number(pitchClassToCamelot(currentSetlist[index+1].track.key))) - 6 ))
//   // console.log('this is the cam diff', camelotDifference);
//   // console.log('this is the first num', Math.abs(Math.abs(Number(camelot)-6)));
//   // console.log('this is the second num', Math.abs((Number(pitchClassToCamelot(currentSetlist[index+1].track.key))) - 6 ));

//   grade = grade - Math.abs(camelotDifference * 6);

//   let tempoDifference = Math.abs(Number(song.track.tempo) - Number(currentSetlist[index + 1].track.tempo))
//   // console.log('this is the first num', Number(currentSetlist[index + 1].track.tempo));
//   // console.log('this is the second num', Number(song.track.tempo));
//   // console.log('this is tempo diff', tempoDifference);
//   grade = grade - Math.round(tempoDifference);
//   console.log('this is grade', grade);
//   console.log('invoking grading func');
//   gradeSetter(grade)
//   grade = `${grade}%`
// }, [])


const setlistGrade = (index) => {
  if (currentSetlist[index+1] === undefined) {
    return null;
  }
  let grade = 100;
  let camelotDifference = (Math.abs(Math.abs(Number(camelot)-6))-Math.abs((Number(pitchClassToCamelot(currentSetlist[index+1].track.key))) - 6 ))
  // console.log('this is the cam diff', camelotDifference);
  // console.log('this is the first num', Math.abs(Math.abs(Number(camelot)-6)));
  // console.log('this is the second num', Math.abs((Number(pitchClassToCamelot(currentSetlist[index+1].track.key))) - 6 ));

  grade = grade - Math.abs(camelotDifference * 4);

  let tempoDifference = Math.abs(Number(song.track.tempo) - Number(currentSetlist[index + 1].track.tempo))
  // console.log('this is the first num', Number(currentSetlist[index + 1].track.tempo));
  // console.log('this is the second num', Number(song.track.tempo));
  // console.log('this is tempo diff', tempoDifference);
  grade = grade - Math.round(tempoDifference);


  console.log('this is grade', grade);
  console.log('invoking grading func');
  // gradeSetter(grade)


  grade = `${grade}%`



  return grade;
}

const gradeSetter = (grade) => {
  console.log('this is overall grade', overallGrade);
  if (!overallGrade.includes(grade)) {
  const array = overallGrade;
  console.log('this is the array im trying to push to', array);
  const second = array.push(grade)
  // const thisgrade = overallGrade;
  console.log('this is second', second);
  //  WHY DO I NEED THIS LINE THIS MAKES NO SENSE WHAT THE HECK !!!!
  if (typeof second !== number) {

    setOverallGrade(second);
  }
  console.log(overallGrade);
  }
}

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
      <div className='grade'>

      {setlistGrade(index)}
      {/* {(currentSetlist.length && setlistView) ? grade : null} */}
      </div>
    </div>
  )
}

export default SongEntry