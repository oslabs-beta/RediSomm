import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routes from './components/Routes';
import './scss/application.scss';

function render() {
  ReactDOM.render(<Routes />, document.getElementById('root'));
}

render();
