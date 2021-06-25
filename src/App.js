import React from 'react';

import Exercise1 from './js/components/Exercise1';

const App = () => {
  return (
    <>
      <div class="exercise-header">
        <h2>Exercise 1 - Testimonial Block</h2>
      </div>

      <Exercise1 />

      <div class="exercise-header">
        <h2>Exercise 2 - Filterable Content</h2>
      </div>

      <div>[Exercise 2 Here]</div>
    </>
  );
}

export default App;