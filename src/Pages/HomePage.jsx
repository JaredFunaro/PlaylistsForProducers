import React from 'react';

function HomePage(props) {

  const handleClick = () => {
    window.location.replace('http://localhost:3000/login');
  }


return (

<div className="HomePage">

  <h1 className='text' id="welcome-message">Welcome to Playlists for Producers</h1>


  <div className='container'>
  <a onClick={handleClick} className=" btn btn-2">LOGIN</a>
  </div>

  <div className="txtcontainer">
  <div className="text-container">
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>
    <div className="txt">MVP </div>

  </div>
</div>

    <h4 className='subtext' id="socials-message"> Check out my socials brah</h4>


  <ul id='socials' className="wrapper">
  <li className="icon facebook">
    <span className="tooltip">Facebook</span>
    <span><i className="fab fa-facebook-f"></i></span>
  </li>
  <li className="icon twitter">
    <span className="tooltip">Twitter</span>
    <span><i className="fab fa-twitter"></i></span>
  </li>
  <li className="icon instagram">
    <span className="tooltip">Instagram</span>
    <span><i className="fab fa-instagram"></i></span>
  </li>
  <li className="icon github">
    <span className="tooltip">Github</span>
    <span><i className="fab fa-github"></i></span>
  </li>
  <li className="icon youtube">
    <span className="tooltip">Youtube</span>
    <span><i className="fab fa-youtube"></i></span>
  </li>
  </ul>

</div>

);

}

export default HomePage;