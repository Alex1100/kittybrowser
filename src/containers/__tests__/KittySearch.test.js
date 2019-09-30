import React from 'react';
import { mount, shallow } from 'enzyme';
import KittySearch from '../KittySearch';
import abi from '../fixtures/cryptoKittyFixtures';


const kitty = {
  birthTime: "1512629047",
  cooldownIndex: "5",
  generation: "4",
  genes: "463028881505861749397975021958553655284201664363079280177407796809477421",
  isGestating: false,
  isReady: true,
  matronId: "115777",
  nextActionAt: "4689864",
  sireId: "119926",
  siringWithId: "0"
};

const web3CallMock = {
  call: jest.fn(() => kitty)
}

const web3RandomCallMock = {
  call: jest.fn(() => 123456)
}

const CryptoKitties = {
  abi,
  methods: {
    totalSupply: jest.fn(() => web3RandomCallMock),
    getKitty: jest.fn(() => web3CallMock),
  }
};

const context = {
  drizzle: {
    contracts: { CryptoKitties },
  }
};

describe('KittySearch Test', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('tests that the component mounts without crashing', async () => {
    jest
      .spyOn(React, "useEffect")
      .mockImplementation(f => 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/123456.png');

    const component = mount(<KittySearch {...context} />);
    const inputField = component.find('.text-input-search');
    await expect(component.props().drizzle).toEqual(context.drizzle);
  });

  it('tests that the component updates search value on each change', async () => {
    jest
      .spyOn(React, "useEffect")
      .mockImplementation(f => 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/123456.png');

    const component = mount(<KittySearch {...context} />);
    const inputField = component.find('.text-input-search');
    inputField.simulate('change', {target: { value: '123456' }});

    await expect(setState).toHaveBeenCalledWith('123456');
  });

  it(`tests that the component makes a call to the contract method 'getKitty'`, async () => {
    jest
      .spyOn(React, "useEffect")
      .mockImplementation(f => 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/123456.png');

    const component = mount(<KittySearch {...context} />);
    const inputField = component.find('.text-input-search');
    inputField.simulate('change', {target: { value: '123456' }});

    await expect(setState).toHaveBeenCalledWith('123456');
    await component.find('form').props().onSubmit();
    await expect(component.props().drizzle.contracts.CryptoKitties.methods.getKitty.mock.calls.length).toEqual(1);
    await expect(setState).toHaveBeenCalledWith(false);
    await expect(setState).toHaveBeenCalledWith('123456');
    await expect(setState).toHaveBeenCalledWith(kitty);
  });

  it(`tests that the hooks to update the current kitty after the search result is returned works`, async () => {
    jest
      .spyOn(React, "useEffect")
      .mockImplementation(f => 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/123456.png');

    const component = mount(<KittySearch {...context} />);
    const inputField = component.find('.text-input-search');
    inputField.simulate('change', {target: { value: '123456' }});

    await expect(setState).toHaveBeenCalledWith('123456');
    await component.find('form').props().onSubmit();
    await expect(component.props().drizzle.contracts.CryptoKitties.methods.getKitty.mock.calls.length).toEqual(1);
    await expect(setState).toHaveBeenCalledWith(false);
    await expect(setState).toHaveBeenCalledWith('123456');
    await expect(setState).toHaveBeenCalledWith(kitty);
  });

  it(`tests that the component makes a call to the contract method 'totalSupply'`, async () => {
    jest
      .spyOn(React, "useEffect")
      .mockImplementation(f => 'https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/123456.png');

    const component = mount(<KittySearch {...context} />);
    const randomKittyButton = component.find('.random-kitty-button');

    randomKittyButton.simulate('click');

    await expect(component.props().drizzle.contracts.CryptoKitties.methods.totalSupply.mock.calls.length).toEqual(1);
  });
});
