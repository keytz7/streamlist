import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies'; // Importing the new Movies component

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<StreamList />} />
                <Route path="/movies" element={<Movies />} /> {/* New route for movies */}
            </Routes>
        </Router>
    );
};

export default App;
