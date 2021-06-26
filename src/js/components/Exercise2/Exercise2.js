import React, { useEffect, useState } from "react";

import MultiSelect from "react-multi-select-component";
import MediaItems from "./MediaItems";
import styles from './Exercise2.module.scss';

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

  const [genre, setGenre] = useState([]);
  const [year, setYear] = useState([]);
  const [type, setType] = useState('');
  const [searchTitle, setSearchTitle] = useState(null);
  const [mediaItems, setMediaItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(mediaItems);

  const genreValueRenderer = (selected, _options) => {
    return "Genre";
  };

  const yearValueRenderer = (selected, _options) => {
    return "Year";
  };

  useEffect(() => {
    const apiUrl = 'https://raw.githubusercontent.com/HubSpotWebTeam/CodeExercise/main/src/js/data/data.json';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.media);
        setMediaItems(data.media);
        setFilteredItems(data.media);
      });
  }, []);

  useEffect(() => {
    if(!genre.length) {
      setFilteredItems(mediaItems);
      return;
    }
    console.log('Genre was changed to: ' + JSON.stringify(genre));
    const filterGenres = genre.map(genre => genre.value);
    const updatedItems = mediaItems.filter(item => {
      return filterGenres.some(genre => item.genre.includes(genre));
    });
    setFilteredItems(updatedItems);
  }, [genre]);

  useEffect(() => {
    if(!year) {
      setFilteredItems(mediaItems);
      return;
    }
    console.log('Year was changed to: ' + JSON.stringify(year));
    const filterYears = year.map(year => year.value);
    const updatedItems = mediaItems.filter(item => {
      return filterYears.some(year => item.year === year);
    });
    setFilteredItems(updatedItems);
  }, [year]);

  useEffect(() => {
    if(!type) {
      setFilteredItems(mediaItems);
      return;
    }
    console.log('Type was changed to: ' + JSON.stringify(type));
    const updatedItems = mediaItems.filter(item => {
      return item.type === type;
    });
    setFilteredItems(updatedItems);
  }, [type]);

  useEffect(() => {
    if(!searchTitle) {
      setFilteredItems(mediaItems);
      return;
    }
    console.log('Search was changed to: ' + JSON.stringify(searchTitle));
    const updatedItems = mediaItems.filter(item => {
      return item.title.toLowerCase().includes(searchTitle.toLowerCase());
    });
    setFilteredItems(updatedItems);
  }, [searchTitle]);

  const filterTypeHandler = (event) => {
    setType(event.target.value);
  };

  const searchTitleChangeHandler = (event) => {
    setSearchTitle(event.target.value);
  };

  const clearFilterHandler = (event) => {
    console.log('clear filter handler ran')
    event.preventDefault();
    setGenre();
    setYear();
    setType();
    setSearchTitle('');
    setFilteredItems(mediaItems);
  };

  return (
    <div className={styles.exercise2}>
      <header className={styles.header}>
        <form>
          <MultiSelect
            className={styles.multiSelect}
            disableSearch={true}
            hasSelectAll={false}
            options={genres}
            value={genre}
            onChange={setGenre}
            labelledBy="Genre"
            label="Genre"
            valueRenderer={genreValueRenderer}
          />

          <MultiSelect
            className={styles.multiSelect}
            disableSearch={true}
            hasSelectAll={false}
            options={years}
            value={year}
            onChange={setYear}
            labelledBy="Year"
            valueRenderer={yearValueRenderer}
          />
          
          <div className={styles.radioButtons} onChange={filterTypeHandler}>
            <input type="radio" id="books" name="mediaType" value="book" />
            <label htmlFor="books">Books</label>
            <input type="radio" id="movies" name="mediaType" value="movie" />
            <label htmlFor="movies">Movies</label>
          </div>

          <div className={styles.search}>
            <input 
              value={searchTitle}
              onChange={searchTitleChangeHandler}
              className={styles.searchInput} type="text" />
          </div>

          <a className={styles.clearFilters} href="" onClick={clearFilterHandler}>Clear Filters</a>
        </form>
      </header>
      <MediaItems items={filteredItems} />
    </div>
  );
};

export default Exercise2;
