import {useState,useEffect} from 'react';
import './App.css';
import Coin from './Coin'

const App = () => {
  return(
  <div className={'main-window'}>
    <div className={"score-area"}>
      <div>Your Score : 400</div>
      <div>Top Score : 500</div>
    </div>
    <div className={'main-window-top-wrapper'}>
      <div className={"words"}>
        <ul>
          <li>Vehicle</li>
          <li>Vehicle</li>
          <li>Vehicle</li>
          <li>Vehicle</li>
        </ul>
      </div>

      <div className={"word-point"}>50 <Coin /> </div>
    </div>

    <div className={"input-area"}>
      <input type={"text"} />
    </div>

  </div>
  )
}

export default App;
