import React from 'react';
import '../../assets/logo-large.png'

const Nav = () => {
  return (
    <div className="nav">
      <div className="logo-space">
        <img className="logo-image" src='../../.webpack/renderer/assets/logo-large.png'></img>
        <div className="nav-text">
          <ul className="nav-menu">
            <li className="nav-menu-item" id="top-nav-item"><span className="list-text">View Databases</span></li>
            <li className="nav-menu-item"><span className="list-text">TTL Tracker</span></li>
            <li className="nav-menu-item"><span className="list-text">Metrics</span></li>
          </ul>
        </div>
      </div>
      <p className="nav-menu-item" id="exit-text">出口</p>
    </div>
  );
};

export default Nav;

{
  /* <img src={require('../../.webpack/renderer/assets/hello.png')} /> */
}
{/* //<img src={require('../../assets/logo-large.png')} /> */}

