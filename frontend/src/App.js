import React from 'react';
import HitsList from './components/HitsList'
function App() {

  return (
    <div>
      <div className="row">
          <div className="header">
            <h1>HN Feed</h1>
            <h3>We &#60;3 hackers news </h3>
          </div>
      </div>
      <div className="row">
        <HitsList/>
      </div>
    </div>
  );
}

export default App;
