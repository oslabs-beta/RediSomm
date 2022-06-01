import React from 'react';
import '../../assets/logo-large.png'
//update ys
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="nav">
      <div className="logo-space">
        <img style={{display: 'none'}}className="logo-image" src={require('../../.webpack/renderer/assets/logo-large.png')}></img>
        <img className="logo-image" src='../../.webpack/renderer/assets/logo-large.png'></img>
        <div className="nav-text">
          <ul className="nav-menu">
            <li className="nav-menu-item" id="top-nav-item">
              <Link className="list-text" to="/">
                View Databases
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link className="list-text" to="/ttl">
                TTL TRACKER
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link className="list-text" to="/metrics">
                Metrics
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link className="list-text" to="/settings">
                설정
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="nav-menu-item" id="exit-text">
        出口
      </div>
    </div>
  );
};

export default Nav;


// const Nav = () => {
//   return (
//     <div className="nav">
//       <div className="logo-space">
//         <img style={{display: 'none'}}className="logo-image" src={require('../../.webpack/renderer/assets/logo-large.png')}></img>
//         <img className="logo-image" src='../../.webpack/renderer/assets/logo-large.png'></img>
//         <div className="nav-text">
//           <ul className="nav-menu">
//             <li className="nav-menu-item" id="top-nav-item"><span className="list-text">View Databases</span></li>
//             <li className="nav-menu-item"><span className="list-text">TTL Tracker</span></li>
//             <li className="nav-menu-item"><span className="list-text">Metrics</span></li>
//             <li className="nav-menu-item"><span className="list-text">설정</span></li>
//           </ul>
//         </div>
//       </div>
//       <p className="nav-menu-item" id="exit-text">出口</p>
//     </div>
//   );
// };

// export default Nav;

{
  /* <img src={require('../../.webpack/renderer/assets/hello.png')} /> */
}
{/* //<img src={require('../../assets/logo-large.png')} /> */}

