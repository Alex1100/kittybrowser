import React, { Component } from 'react';
import { object } from 'prop-types';
import Web3 from 'web3';
import KittyCoreABI from '../contracts/abis/KittyCoreABI.json';
import { CONTRACT_NAME, CONTRACT_ADDRESS } from '../config';
// import { drizzleConnect } from 'drizzle-react';
import KittySearch from '../containers/KittySearch';

class Browser extends Component {
  constructor(props) {
    super(props);
    console.log("PROPS IN BROWSER: ", props);
    this.state = {};
  }


  componentDidMount() {
    const web3 = new Web3(window.ethereum);

    // Initialize the contract instance

    const kittyContract = new web3.eth.Contract(
      KittyCoreABI, // import the contracts's ABI and use it here
      CONTRACT_ADDRESS,
    );

    // Add the contract to the drizzle store
    console.log('CONTEXT: ', this.context)
    this.context.drizzle.addContract({
      contractName: CONTRACT_NAME,
      web3Contract: kittyContract,
    });
  }

  render() {
    return (
      <div className="browser">
        <h1>Kitty Browser</h1>
        <KittySearch {...this.context} />
      </div>
    );
  }
}

Browser.contextTypes = {
  drizzle: object,
};

export default Browser;
