import React from 'react';
import DatabaseView from './DatabaseView';
// import Nav from './Nav';
//update ys
import { Routes, Route } from 'react-router-dom';
import TTLpage from './pages/TTLpage';
import Settings from './pages/Settings';
import Metrics from './pages/Metrics';

const RoutesTest = () => {
  return (
    <Routes>
      <Route path="/" element={<DatabaseView />} />
      <Route path="/ttl" element={<TTLpage />} />
      <Route path="/metrics" element={<Metrics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default RoutesTest;


// const Routes = () => {
//   return (
//     <div className="window-display">
//       <Nav />
//       <div className="routes">
//         <DatabaseView />
//       </div>
//     </div>
//   );
// };

// export default Routes;
