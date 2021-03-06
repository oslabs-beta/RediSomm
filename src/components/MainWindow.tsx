import React from 'react';
import DatabaseView from './DatabaseView';
// import Nav from './Nav';
//update ys
import { Routes, Route } from 'react-router-dom';
import Usage from './pages/Usage';
import Settings from './pages/Settings';
import Metrics from './pages/Metrics';

const MainWindow = () => {
  return (
    <Routes>
      <Route path="/" element={<DatabaseView />} />
      <Route path="/usage" element={<Usage />} />
      <Route path="/metrics" element={<Metrics />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default MainWindow;

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
