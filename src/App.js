import React from 'react';
import './App.css';
import './assets/fonts/roboto.css'
import './assets/fonts/razerf5.css'
import ProfilePanel from './container/profile-panel';
import Windown from './component/window/window';

function App() {
  return (
    <div className="main-container">
        <div class="thx-wrapper flex">
            <ProfilePanel></ProfilePanel>
            <Windown></Windown>
        </div>
    </div>
  );
}

export default App;
