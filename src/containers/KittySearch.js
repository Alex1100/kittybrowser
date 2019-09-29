import React, { Fragment, useState, useEffect } from 'react';
import { KittyInfo } from '../components/KittyInfo';

const KittySearch = (props) => {
  const { drizzle: { contracts: { CryptoKitties } } } = props;
  const [currentKittyQuery, setCurrentKittyQuery] = useState('');
  const [currentKitty, setCurrentKitty] = useState({});
  const [currentKittyImgUrl, setCurrentKittyImgUrl] = useState('');

  async function grabImage() {
    const k = await fetch(`https://api.cryptokitties.co/kitties/${currentKittyQuery}`)
    const kitty = await k.json();
    return kitty.image_url;
  }

  useEffect(() => {
    grabImage()
      .then(img => setCurrentKittyImgUrl(img));

    return () => {
      setCurrentKittyImgUrl('');
    };
  }, [currentKitty]);

  const handleChange = (evt) => {
    setCurrentKittyQuery(evt.target.value);
  };

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

    setCurrentKitty(kittyStruct);
    setCurrentKittyQuery('');
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <label>
          Search for a Kitty by their unique ID
          <input
            type="text"
            value={currentKittyQuery}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="Find the Kitty" />
      </form>

      <KittyInfo {...currentKitty} imgUrl={currentKittyImgUrl} />
    </Fragment>
  );
}

export default KittySearch;
