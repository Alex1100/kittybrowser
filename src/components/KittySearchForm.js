import React, { Fragment } from 'react';

export const KittySearchForm = ({ handleSubmit, handleChange, currentKittyQuery }) => {
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
    </Fragment>
  )
}
