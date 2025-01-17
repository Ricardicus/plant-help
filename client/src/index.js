import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Timers from './components/timers';
import './components/timer.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

ReactDOM.render(
  <React.StrictMode>
    <Timers />
    <center>
    <div id="loader" className="hidden">
    <Loader
      type="Puff"
      color="#00BFFF"
      height={30}
      width={30}
    />
    </div>
    </center>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
