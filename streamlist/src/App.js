import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';

const App = () => {
    const [cartItems, setCartItems] = useState([]); // Initialize with an empty array

    useEffect(() => {
        // Load cart items from localStorage on component mount
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCart); // Set cart items from localStorage
    }, []);

    return (
        <Router>
            <Navbar cartItemsCount={cartItems.length} />
            <Routes>
                <Route path="/" element={<StreamList setCartItems={setCartItems} cartItems={cartItems} />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            </Routes>
        </Router>
    );
};

export default App;
