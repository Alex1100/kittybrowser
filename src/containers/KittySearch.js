import React, { Fragment, useState, useEffect } from 'react';
import { KittyInfo } from '../components/KittyInfo';
import { KittySearchForm } from '../components/KittySearchForm';

const KittySearch = (props) => {
  const { drizzle: { contracts: { CryptoKitties } } } = props;
  const [currentKittyQuery, setCurrentKittyQuery] = useState('');
  const [currentKitty, setCurrentKitty] = useState({});
  const [currentKittyImgUrl, setCurrentKittyImgUrl] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [queryError, setQueryError] = useState('');

  async function grabImage() {
    try {
      const k = await fetch(`https://api.cryptokitties.co/kitties/${currentKittyQuery}`)
      const kitty = await k.json();
      return kitty.image_url;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  useEffect(() => {
    if (currentKittyQuery) {
      grabImage()
        .then(img => {
          setCurrentKittyImgUrl(img)
        });
    }

    return () => {
      setCurrentKittyImgUrl('');
      setQueryError('');
    };
  }, [currentKitty]);

  const handleChange = (evt) => {
    setCurrentKittyQuery(evt.target.value);
  };

  const getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const generateRandomKittyId = async (methods) => {
    try {
      const totalSupply = await methods.totalSupply().call();
      return getRandomArbitrary(1, totalSupply);
    } catch (e) {
      throw new Error(e);
    }
  }

  const handleRandomSubmit = async (evt) => {
    if (evt) {
      evt.preventDefault();
    }

    try {
      setQueryError('');
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
    } catch (e) {
      setQueryError(`Network error. Couldn't retrieve the data from the Ethereum blockchain at the moment.\n${e.message}`);
    }
  }

  const handleSubmit = async (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    try {
      setQueryError('');
      if (typeof currentKittyQuery === 'string' && currentKittyQuery.replace(/\d/g, '').length !== 0) {
        throw new Error(`Kitty ID must be a number greater than 0.`)
      }

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
    } catch (e) {
      setQueryError(`Network error. Couldn't retrieve the data from the Ethereum blockchain at the moment.\n${e.message}`);
    }
  };

  return (
    <Fragment>
      <KittySearchForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        currentKittyQuery={currentKittyQuery}
      />
      <div className="button-div">
        <button
          className="random-kitty-button"
          type="button"
          onClick={handleRandomSubmit}
        >
          Find Random Kitty
        </button>
      </div>
      {queryError && <div className="error">
        <h1>{queryError}</h1>
      </div>}
      {!queryError && <div className={initialLoad ? '' : "kitty-info"}>
        <KittyInfo {...currentKitty} imgUrl={currentKittyImgUrl} initialLoad={initialLoad} />
      </div>}
    </Fragment>
  );
}

export default KittySearch;
