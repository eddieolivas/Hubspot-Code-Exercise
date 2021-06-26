import React from 'react';

import styles from './MediaItems.module.scss';

const MediaItems = (props) => {
  return (
    <div className={styles.mediaItems}>
      {props.items.map((item) => (
        <div 
          className={styles.mediaItem} 
          key={item.title}
        >
          <img src={item.poster} />
          <p className={styles.itemTitle}>{item.title} ({item.year})</p>
          <p>Genres: {item.genre.length && item.genre.map((genre) => (<span key={genre} className={styles.genre}>{genre} </span>))}</p>
        </div>
      ))}
    </div>
  );
};

export default MediaItems;