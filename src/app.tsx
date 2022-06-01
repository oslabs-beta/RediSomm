import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainWindow from './components/MainWindow';
import './scss/application.scss';
//update ys
import Nav from './components/Nav';
import { BrowserRouter, Router, Route } from 'react-router-dom';


function render() {
  ReactDOM.render(
    <BrowserRouter>
      <div className="container">
        <Nav />
        <MainWindow />
      </div>
    </BrowserRouter>,
    document.getElementById('root')
  );
}

render();



// function render() {
//   ReactDOM.render(<MainWindow />, document.getElementById('root'));
// }

// render();
