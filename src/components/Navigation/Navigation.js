import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <div>
    <div><Link to="/">Player Dashboard</Link></div>
    <div><Link to="/racetrack">Race Track</Link></div>
  </div>
);

export default Navigation;
