import React from 'react';
import './App.css';
import Content from './components/Content';


import { Context } from './components/WalletContextProvider';

function App() {
  return (
    
    <div className="App">
      <Context>
        <Content/>
      </Context>
    </div>
  );
}

export default App;
