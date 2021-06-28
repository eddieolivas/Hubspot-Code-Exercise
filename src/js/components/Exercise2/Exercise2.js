import React, { useEffect, useState } from "react";

import MultiSelect from "react-multi-select-component";
import MediaItems from "./MediaItems";
import styles from './Exercise2.module.scss';
import search from 'url:../../../assets/images/search.png';
import { years, genres } from "./multiSelectValues";

const Exercise2 = () => {
  // Custom value rendered for multi-select field.
  const valueRenderer = (value) => value;

  // Set up state slices for each filter
  const [genre, setGenre] = useState([]);
  const [year, setYear] = useState([]);
  const [type, setType] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [clearFilters, setClearFilters] = useState(false);

  // Set up state slices for the original list of media items and the filtered items
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(originalItems);

  useEffect(() => {
    // Fetch the list of media items and set the original and filtered list to the data that's returned
    const apiUrl = 'https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setOriginalItems(data.media);
        setFilteredItems(data.media);
      });
  }, []);

  // The main filter function which runs when any of the filters change
  useEffect(() => {
    // If clear filters was clicked, set the filtered items back to the original list
    if (clearFilters) {
      setFilteredItems(originalItems);
      setClearFilters(false);
      return;
    }

    // Set up the filters object with the state values
    const filters = {
      genre: genre.map(genre => genre.value),
      year: year.map(genre => genre.value),
      type: type,
      title: searchTitle
    };

    // The main filter function. Filter items in the original list by looping through the keys in the filter object
    // and comparing the key's value to the values in the media item
    var filterKeys = Object.keys(filters);
    const updatedItems = originalItems.filter((item) => {
      return filterKeys.every((key) => {
        // If the filter has no value, return true or "skip" it
        // If the filter is an array, convert the item's value to lowercase and check if the filter contains that value
        if (!filters[key].length) {
          return true; 
        } else if (!Array.isArray(filters[key])) {
          return item[key].toLowerCase().includes(filters[key].toLowerCase());
        }
        // If the filter is not an array, check if the item's value includes the filter's value
        return filters[key].some(filter => item[key].includes(filter));
      });
    });

    // Set the filtered items to the updated items
    setFilteredItems(updatedItems);

  }, [genre, year, type, searchTitle]);

  // Set the type filter state value and kick off the main filter function
  const filterTypeHandler = (event) => {
    setType(event.target.value);
  };

  // Set the search title state value and kick off the main filter function
  const searchTitleChangeHandler = (event) => {
    setSearchTitle(event.target.value);
  };

  // Set all filters back to default values
  const clearFilterHandler = (event) => {
    event.preventDefault();
    setClearFilters(true);
    setGenre([]);
    setYear([]);
    setType('');
    setSearchTitle('');
    setFilteredItems(originalItems);
  };

  return (
    <div className={styles.exercise2}>
      <header className={styles.header}>
        <form>
          <div className={styles.leftSide}>
            <MultiSelect
              className={styles.multiSelect}
              disableSearch={true}
              hasSelectAll={false}
              options={genres}
              value={genre}
              onChange={setGenre}
              label="Genre"
              valueRenderer={() => valueRenderer('Genre')}
            />

            <MultiSelect
              className={styles.multiSelect}
              disableSearch={true}
              hasSelectAll={false}
              options={years}
              value={year}
              onChange={setYear}
              label="Year"
              valueRenderer={() => valueRenderer('Year')}
            />
            
            <fieldset className={styles.radioButtons}>
              <legend style={{display: 'none'}}>Choose media type</legend>
              <input 
                type="radio" 
                id="books" 
                name="mediaType" 
                checked={type === "book"} 
                onChange={filterTypeHandler} 
                value="book" 
              />
              <label htmlFor="books">Books</label>
              <input 
                type="radio" 
                id="movies" 
                name="mediaType" 
                checked={type === "movie"} 
                onChange={filterTypeHandler} 
                value="movie" 
              />
              <label htmlFor="movies">Movies</label>
            </fieldset>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.search}>
              <label htmlFor="search" style={{display: 'none'}}>Search</label>
              <input 
                id="search"
                value={searchTitle}
                onChange={searchTitleChangeHandler}
                className={styles.searchInput} type="text" />
              <button className={styles.searchButton} type="submit" onClick={(e) => e.preventDefault()}><img alt="Search icon" src={search} /></button>
            </div>

            <a className={styles.clearFilters} href="" onClick={clearFilterHandler}>Clear Filters</a>
          </div>
        </form>
      </header>
      <MediaItems items={filteredItems} />
    </div>
  );
};

export default Exercise2;
