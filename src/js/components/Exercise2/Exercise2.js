import React, { useEffect, useState } from "react";

import MultiSelect from "react-multi-select-component";
import MediaItems from "./MediaItems";
import styles from './Exercise2.module.scss';
import search from 'url:../../../assets/images/search.png';

const Exercise2 = () => {
  const genres = [
    { label: "Action", value: "action" },
    { label: "Adventure", value: "adventure" },
    { label: "Animation", value: "animation"},
    { label: "Biography", value: "biography" },
    { label: "Classics", value: "classics" },
    { label: "Comedy", value: "comedy" },
    { label: "Crime", value: "crime" },
  ];

  const years = [
    { label: "1870", value: "1870" },
    { label: "1892", value: "1892" },
    { label: "1895", value: "1895"},
    { label: "1963", value: "1963" },
    { label: "1971", value: "1971" },
    { label: "1973", value: "1973" },
    { label: "1974", value: "1974" },
  ];

  // Custom value rendered for multi-select field.
  const valueRenderer = (value) => value;

  const [genre, setGenre] = useState([]);
  const [year, setYear] = useState([]);
  const [type, setType] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(originalItems);
  const [clearFilters, setClearFilters] = useState(false);

  useEffect(() => {
    const apiUrl = 'https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setOriginalItems(data.media);
        setFilteredItems(data.media);
      });
  }, []);

  useEffect(() => {
    if (clearFilters) {
      setFilteredItems(originalItems);
      setClearFilters(false);
      return;
    }
    const filters = {
      genre: genre.map(genre => genre.value),
      year: year.map(genre => genre.value),
      type: type,
      title: searchTitle
    };

    var filterKeys = Object.keys(filters);
    const updatedItems = originalItems.filter((item) => {
      return filterKeys.every((key) => {
        if (!filters[key].length) {
          return true; 
        } else if (!Array.isArray(filters[key])) {
          return item[key].toLowerCase().includes(filters[key].toLowerCase());
        }
        return filters[key].some(filterGenre => item[key].includes(filterGenre));
      });
    });

    setFilteredItems(updatedItems);

  }, [genre, year, type, searchTitle]);

  const filterTypeHandler = (event) => {
    setType(event.target.value);
  };

  const searchTitleChangeHandler = (event) => {
    setSearchTitle(event.target.value);
  };

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
              labelledBy="Genre"
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
              labelledBy="Year"
              valueRenderer={() => valueRenderer('Year')}
            />
            
            <div className={styles.radioButtons}>
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
            </div>
          </div>

          <div className={styles.rightSide}>
            <div className={styles.search}>
              <input 
                value={searchTitle}
                onChange={searchTitleChangeHandler}
                className={styles.searchInput} type="text" />
              <button className={styles.searchButton} type="submit" onClick={(e) => e.preventDefault()}><img src={search} /></button>
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
