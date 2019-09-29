import React, { Component } from 'react';
import { Drizzle } from 'drizzle';

import { DrizzleProvider } from 'drizzle-react'
import './App.css';
import Loading from './containers/Loading';
import Browser from './components/Browser';
import KittyCoreABI from './contracts/abis/KittyCoreABI.json'

class App extends Component {
  render() {
    const options = {
      contracts: [KittyCoreABI]
    };
    const drizzle = new Drizzle(options);

    return (
      <DrizzleProvider contracts={drizzle.contracts} options={drizzle}>
        <Loading drizzleContext={drizzle}>
          <Browser />
        </Loading>
      </DrizzleProvider>
    );
  }
}

export default App;
