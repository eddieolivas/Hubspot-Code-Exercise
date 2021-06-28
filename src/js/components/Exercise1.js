import React from "react";

import * as style from './Exercise1.module.scss';

const Exercise1 = () => {
  return (
    <div className={style.exercise1}>
      <div className={style.container}>
        <div className={style.testimonial}>
          <p>
            Gingerbread tart cupcake cake muffin cookie liquorice tiramisu.
            Toffee cupcake cake cake croissant icing carrot cake cookie. Dessert
            chocolate bar apple pie sesame snaps liquorice carrot cake cookie
            danish.
          </p>
          <span>Indiana Jones, Archaeologist</span>
        </div>
        <a>Tell Me More</a>
      </div>
    </div>
  );
};

export default Exercise1;
