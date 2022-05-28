import React from 'react';

const Nav = () => {
  return (
    <div className="nav">
      <div className="logo-space">
        <img className="logo-image"></img>
      </div>
      <h3> View Databases</h3>
      <h3>TTL TRACKER</h3>
      <h3 id="exit-text">出口</h3>
    </div>
  );
};

export default Nav;

{
  /* <img src={require('../../.webpack/renderer/assets/hello.png')} /> */
}
//<img src={require('../../assets/logo-large.png')} />
