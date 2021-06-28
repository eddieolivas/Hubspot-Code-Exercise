import React, { useState } from 'react';

import styles from './MediaItems.module.scss';
import notFound from 'url:../../../assets/images/not-found.png';

const MediaItems = (props) => {
  return (
    <div className={styles.mediaItems}>
      {/* Loop through the media items sent through props and output each item */}
      {props.items.map((item) => (
        <div 
          className={styles.mediaItem} 
          key={item.title}
        >
          <img 
            alt={`${item.title} ${item.type === 'book' ? 'cover' : 'poster'}`}
            src={item.poster} 
            onError={(e)=>{e.target.onError = null; e.target.src = notFound}}
          />
          <h3 className={styles.itemTitle}>{item.title} ({item.year})</h3>
          <p>Genres: {item.genre.length && item.genre.map((genre) => (<span key={genre} className={styles.genre}>{genre} </span>))}</p>
        </div>
      ))}
    </div>
  );
};

export default MediaItems;