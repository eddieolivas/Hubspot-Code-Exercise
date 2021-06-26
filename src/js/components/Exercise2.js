import React, { useEffect, useState } from "react";

import MultiSelect from "react-multi-select-component";
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
  const [mediaItems, setMediaItems] = useState([]);

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
        console.log('This is your data', data)
        setMediaItems(data.media);
      });
  }, []);

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
          
          <div className={styles.radioButtons}>
            <input type="radio" id="books" name="mediaType" value="Books" />
            <label htmlFor="books">Books</label>
            <input type="radio" id="movies" name="mediaType" value="Movies" />
            <label htmlFor="movies">Movies</label>
          </div>

          <div className={styles.search}>
            <input className={styles.searchInput} type="text" />
          </div>

          <a href="#">Clear Filters</a>
        </form>
      </header>
      <div className={styles.mediaItems}>
        {mediaItems.map((item) => (
          <div 
            className={styles.mediaItem} 
            key={item.title}
          >
            <img src={item.poster} />
            <p className={styles.itemTitle}>{item.title} ({item.year})</p>
            <p>Genres: {item.genre.length && item.genre.map((genre) => (<span className={styles.genre}>{genre} </span>))}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercise2;
