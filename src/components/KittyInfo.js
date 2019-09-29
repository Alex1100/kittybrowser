import React, { Fragment } from 'react';

export const KittyInfo = (props) => {
  return (
    <Fragment>
      {props.genes && <p className="word-wrap">Genes: {props.genes}</p>}

      <div className="details">
        {props.generation && <p className="inline-p mr-5 left">
          Generation: {props.generation}
        </p>}

        {props.birthTime && <p className="inline-p">
          Birth Time: {props.birthTime}
        </p>}

      </div>

      {!props.imgUrl && !props.initialLoad && <div className="loading" style={{ display: 'block', margin: '0 auto', width: '120px', height: '120px'}}>
        <h1 style={{ color: 'white', fontSize: '3vh' }}>Loading Kitty...</h1>
        <div style={{ width: '100%', height: '100%' }}>
          <img src="https://www.cryptokitties.co/images/loader.gif" className="kitty" width="120" alt="loading kitty" />
        </div>
      </div>}

      {props.imgUrl && <div style={{width: '100%', height: '100%'}}><img className="kitty" src={props.imgUrl} alt={'kitty'} /></div>}
    </Fragment>
  )
}
