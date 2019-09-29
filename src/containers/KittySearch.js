import React, { Fragment, useState, useEffect } from 'react';
import { KittyInfo } from '../components/KittyInfo';

const KittySearch = (props) => {
  const { drizzle: { contracts: { CryptoKitties } } } = props;
  const [currentKittyQuery, setCurrentKittyQuery] = useState('');
  const [currentKitty, setCurrentKitty] = useState({});
  const [currentKittyImgUrl, setCurrentKittyImgUrl] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  async function grabImage() {
    console.log('CHECK: ', currentKittyQuery);
    const k = await fetch(`https://api.cryptokitties.co/kitties/${currentKittyQuery}`)
    const kitty = await k.json();
    return kitty.image_url;
  }

  useEffect(() => {
    grabImage()
      .then(img => {
        setCurrentKittyImgUrl(img)
      });

    return () => {
      setCurrentKittyImgUrl('');
    };
  }, [currentKitty]);

  const handleChange = (evt) => {
    setCurrentKittyQuery(evt.target.value);
  };

  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const generateRandomKittyId = async (methods) => {
    const totalSupply = await methods.totalSupply().call();
    return getRandomArbitrary(1, totalSupply);
  }

  const handleRandomSubmit = async (evt) => {
    evt.preventDefault();
    const { methods } = CryptoKitties;

    const kittyId = await generateRandomKittyId(methods);


    const {
      isGestating,
      isReady,
      cooldownIndex,
      nextActionAt,
      siringWithId,
      birthTime,
      matronId,
      sireId,
      generation,
      genes
    } = await methods.getKitty(kittyId).call();

    const kittyStruct = {
      isGestating,
      isReady,
      cooldownIndex,
      nextActionAt,
      siringWithId,
      birthTime,
      matronId,
      sireId,
      generation,
      genes
    };

    setInitialLoad(false);
    setCurrentKittyQuery(kittyId);
    setCurrentKitty(kittyStruct);
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { methods } = CryptoKitties;

    const {
      isGestating,
      isReady,
      cooldownIndex,
      nextActionAt,
      siringWithId,
      birthTime,
      matronId,
      sireId,
      generation,
      genes
    } = await methods.getKitty(currentKittyQuery).call();

    const kittyStruct = {
      isGestating,
      isReady,
      cooldownIndex,
      nextActionAt,
      siringWithId,
      birthTime,
      matronId,
      sireId,
      generation,
      genes
    };

    setInitialLoad(false);
    setCurrentKittyQuery(currentKittyQuery);
    setCurrentKitty(kittyStruct);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label className="stacked-label">
          Search for a Kitty by their unique ID
        </label>
        <input
          className="text-input-search"
          type="text"
          value={currentKittyQuery}
          onChange={handleChange}
        />
        <input
          className="kitty-search-btn"
          type="submit"
          value="Find the Kitty"
        />
      </form>
      <div className="button-div">
        <button
          className="random-kitty-button"
          type="button"
          onClick={handleRandomSubmit}
        >
          Find Random Kitty
        </button>
      </div>
      <div className={initialLoad ? '' : "kitty-info"}>
        <KittyInfo {...currentKitty} imgUrl={currentKittyImgUrl} initialLoad={initialLoad} />
      </div>
    </Fragment>
  );
}

export default KittySearch;
