import React from 'react';

import Exercise1 from './js/components/Exercise1';
import Exercise2 from './js/components/Exercise2';

const App = () => {
  return (
    <>
      <div className="exercise-header">
        <h2>Exercise 1 - Testimonial Block</h2>
      </div>

      <Exercise1 />

      <div className="exercise-header">
        <h2>Exercise 2 - Filterable Content</h2>
      </div>

      <Exercise2 />
    </>
  );
}

export default App;