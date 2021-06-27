import React, { useState } from 'react';

import styles from './MediaItems.module.scss';

const MediaItems = (props) => {
  const [urlError, setUrlError] = useState(false);

  return (
    <div className={styles.mediaItems}>
      {props.items.map((item) => (
        <div 
          className={styles.mediaItem} 
          key={item.title}
        >
          <img 
            src={item.poster} 
            onError={(e)=>{e.target.onError = null; e.target.src = 'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'}}
          />
          <p className={styles.itemTitle}>{item.title} ({item.year})</p>
          <p>Genres: {item.genre.length && item.genre.map((genre) => (<span key={genre} className={styles.genre}>{genre} </span>))}</p>
        </div>
      ))}
    </div>
  );
};

export default MediaItems;