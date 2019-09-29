import React, { Fragment } from 'react';

export const KittyInfo = (props) => {
  return (
    <Fragment>
      {props.genes && <p>Genes: {props.genes}</p>}
      {props.generation && <p>Generation: {props.generation}</p>}
      {props.birthTime && <p>Birth Time: {props.birthTime}</p>}
      {props.imgUrl && <img style={{ width: '40%', height: '65%', margin: '0 auto' }}src={props.imgUrl} alt={'kitty'} />}
    </Fragment>
  )
}
