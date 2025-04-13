import React from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import StreamList from './components/StreamList';
import Movies from './components/Movies'; 
import Cart from './components/Cart'; 
import About from './components/About'; 

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" exact component={StreamList} />
        <Route path="/movies" component={Movies} />
        <Route path="/cart" component={Cart} />
        <Route path="/about" component={About} />
      </Routes>
    </Router>
  );
}; 

export default App; 