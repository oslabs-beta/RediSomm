import React from 'react';
import { FC } from 'react';

interface tickerTypes {}
// import DataRow from './DataRow';

const Ticker: FC<tickerTypes> = () => {
  return (
    <div className="ticker-container">
      <div className="ticker-name">Ticker</div>
      <div className="table ticker-table"></div>
    </div>
  );
};

export default Ticker;
