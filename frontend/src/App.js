import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Intensity from './components/Intensity';
import Region from './components/Region';
import Topics from './components/Topics';
import Relevance from './components/Relevance';
import Sector from './components/Sector';
import Likelihood from './components/Likelihood';
import Country from './components/Country';
import Year from './components/Year';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Home />
      <Routes>
        <Route path="/" exact component={Home} />
        <Route path="/intensity" component={Intensity} />
        <Route path="/region" component={Region} />
        <Route path="/topics" component={Topics} />
        <Route path="/relevance" component={Relevance} />
        <Route path="/sector" component={Sector} />
        <Route path="/likelihood" component={Likelihood} />
        <Route path="/country" component={Country} />
        <Route path="/year" component={Year} />
      </Routes>
    </Router>
  )
}

export default App;