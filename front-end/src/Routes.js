import react from 'react';
import {Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';

const Routing = () => (
  <Routes>
    <Route exact path='/' component={HomePage} />
  </Routes>
);

export default Routing;
