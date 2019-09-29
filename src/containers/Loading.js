import React, { Component, Children, cloneElement } from 'react';
import { drizzleConnect } from 'drizzle-react';

class Loading extends Component {
  constructor(props, context) {
    super(props);
  }

  render() {
    const { drizzleStatus, web3, contracts } = this.props;
    if (window.web3 === undefined || this.props.web3.status === 'failed') {
      return(
        // Display a web3 warning.
        <div className="warning">
          <p>This browser has no connection to the Ethereum network. </p>
          <p>Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
        </div>
      );
    }

    if (this.props.drizzleStatus.initialized) {
      // Load the dapp.
      const childrenWithProps = Children.map(this.props.children, child =>
        cloneElement(child, { drizzleContext: { drizzleStatus: drizzleStatus, web3: web3, contracts: contracts }})
      );
      return childrenWithProps;
    }

    return(
      // Display a loading indicator.
      <div className="loading">
        <h1>Loading dapp...</h1>
        <img src="https://www.cryptokitties.co/images/loader.gif" width="120" alt="loading" />
      </div>
    );
  }
};

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  console.log('STATE: ', state);
  return {
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    contracts: state.contracts,
  };
}

export default drizzleConnect(Loading, mapStateToProps);
