import React from 'react';
import { KittyInfo } from '../KittyInfo';
import { shallow } from 'enzyme';

const kittyWithoutImgUrl = {
  birthTime: "1512629047",
  cooldownIndex: "5",
  generation: "4",
  genes: "463028881505861749397975021958553655284201664363079280177407796809477421",
  isGestating: false,
  isReady: true,
  matronId: "115777",
  nextActionAt: "4689864",
  sireId: "119926",
  siringWithId: "0",
  initialLoad: false,
};

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
  siringWithId: "0",
  imgUrl: "https://img.cryptokitties.co/0x06012c8cf97bead5deae237070f9587f8e7a266d/123456.png",
  initialLoad: false,
}

describe('KittyInfo Test', () => {
  describe('Tests initially loaded Kitty Info: ', () => {
    const component = shallow(<KittyInfo {...kittyWithoutImgUrl} />);

    it(`tests the presence of the gene data`, () => {
      const geneData = component.find('.word-wrap');
      expect(geneData.text()).toEqual(`Genes: ${kittyWithoutImgUrl.genes}`);
    });

    it(`tests the presence of the generation data`, () => {
      const generationData = component.find('p').at(1);
      expect(generationData.text()).toEqual(`Generation: ${kittyWithoutImgUrl.generation}`);
    });

    it(`tests the presence of the birth data`, () => {
      const birthData = component.find('p').at(2);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const birthDay = new Date(kittyWithoutImgUrl.birthTime * 1000).toLocaleString('en', options);
      expect(birthData.text()).toEqual(`Birth Time: ${birthDay}`);
    });

    it(`tests the presence of the loading state`, () => {
      const loadingState = component.find('h1');
      const imgData = component.find('img');
      expect(loadingState.text()).toEqual('Loading Kitty...');
      expect(imgData.props().src).toEqual('https://www.cryptokitties.co/images/loader.gif')
    });
  });

  describe('Tests loaded after searched result Kitty Info', () => {
    const component = shallow(<KittyInfo {...kitty} />);

    it(`tests the presence of the gene data`, () => {
      const geneData = component.find('.word-wrap');
      expect(geneData.text()).toEqual(`Genes: ${kitty.genes}`);
    });

    it(`tests the presence of the generation data`, () => {
      const generationData = component.find('p').at(1);
      expect(generationData.text()).toEqual(`Generation: ${kitty.generation}`);
    });

    it(`tests the presence of the birth data`, () => {
      const birthData = component.find('p').at(2);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const birthDay = new Date(kitty.birthTime * 1000).toLocaleString('en', options);
      expect(birthData.text()).toEqual(`Birth Time: ${birthDay}`);
    });

    it(`tests the presence of the kitty img`, () => {
      const imgData = component.find('.kitty');
      expect(imgData.props().src).toEqual(`${kitty.imgUrl}`);
    });
  });
});
