import React from 'react';
const logo = require('../../assets/logo-large.png');

const Nav = () => {
  return (
    <div className="nav">
      <div className="logo-space">
        <img className="logo-image" src={logo} />
      </div>
      <h3> i am navbar</h3>
    </div>
  );
};

export default Nav;
