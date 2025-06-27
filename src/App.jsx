import React, { useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import MensClothing from './Components/Pages/MensClothing';
import WomensClothing from './Components/Pages/WomensClothing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Navbar onSearch={handleSearch} />
      <Switch>
        <Route path="/mens">
          <MensClothing searchQuery={searchQuery} />
        </Route>
        <Route path="/womens">
          <WomensClothing searchQuery={searchQuery} />
        </Route>
        {/* Other routes */}
      </Switch>
    </Router>
  );
};

export default App; 