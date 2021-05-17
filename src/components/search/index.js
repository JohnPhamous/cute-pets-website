import React, { useRef } from 'react';
import { useHistory } from 'react-router';

const Search = () => {
  const history = useHistory();
  const searchInputRef = useRef();

  const onSearchHandler = (e) => {
    e.preventDefault();

    const searchQuery = new URLSearchParams({
      query: searchInputRef.current.value
    });

    history.push({ pathname: '/search', search: `${searchQuery.toString()}` });
  };

  return (
    <form onSubmit={onSearchHandler} className="search-form">
      <input type="text" className="search" ref={searchInputRef} />
      <button type="submit" className="search-button">
        🔎
      </button>
    </form>
  );
};

export default Search;
