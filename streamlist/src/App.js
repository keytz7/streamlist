import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './components/StreamList';
import Movies from './components/Movies';
import Cart from './components/Cart';
import About from './components/About'; 
import { GoogleLogin } from '@react-oauth/google'; 
import CreditCard from './components/CreditCard'; 

const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCart);
    }, []);

    const handleLoginSuccess = (response) => {
        setIsAuthenticated(true);
        console.log('Login Success:', response);
    };

    const handleLoginFailure = (response) => {
        console.error('Login Failed:', response);
    };

    return (
        <Router>
            <Navbar cartItemsCount={cartItems.length} />
            <Routes>
                <Route 
                    path="/" 
                    element={isAuthenticated ? <StreamList setCartItems={setCartItems} cartItems={cartItems} /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/movies" 
                    element={isAuthenticated ? <Movies /> : <Navigate to="/login" />} 
                />
                <Route 
                    path="/cart" 
                    element={isAuthenticated ? <Cart cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to="/login" />}
                />
                <Route 
                    path="/about" 
                    element={<About />} 
                />
                <Route path="/login" element={
                    <GoogleLogin
                        onSuccess={handleLoginSuccess}
                        onFailure={handleLoginFailure}
                    />
                } />
                <Route 
                    path="/credit-card" 
                    element={isAuthenticated ? <CreditCard /> : <Navigate to="/login" />} 
                />
            </Routes>
        </Router>
    );
};

export default App;
