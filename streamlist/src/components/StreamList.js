import React, { useState } from 'react';
import list from './Data'; // Ensure the correct path to your data file

const StreamList = ({ setCartItems, cartItems }) => {
    const [errorMsg, setErrorMsg] = useState('');

    const addItemToCart = (item) => {
        // Clear previous error message when trying to add an item
        setErrorMsg('');

        // Check if the item is a subscription and if there's already one in cart
        if (item.isSubscription && cartItems.some(cartItem => cartItem.isSubscription)) {
            setErrorMsg('You can only have one subscription in your cart at a time.');
            return;
        }

        // Check if the item is already in the cart
        const alreadyInCart = cartItems.some(cartItem => cartItem.id === item.id);

        if (alreadyInCart) {
            setErrorMsg('This item is already in your cart.');
            return; // Prevent adding the same item again
        }

        // Add new item to cart with initial amount set to 1
        const updatedCart = [...cartItems, { ...item, amount: 1 }];
        
        // Save the updated cart to localStorage
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        setCartItems(updatedCart); // Update parent state
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Available Items</h1>
            {errorMsg && <div style={styles.error}>{errorMsg}</div>}
            <div style={styles.cardContainer}>
                {list.map(item => (
                    <div key={item.id} style={styles.card}>
                        <img src={item.img} alt={item.service} style={styles.image} />
                        <div style={styles.cardContent}>
                            <h2 style={styles.serviceName}>{item.service}</h2>
                            <p style={styles.serviceInfo}>{item.serviceInfo}</p>
                            <p style={styles.price}>${item.price}</p>
                            <button style={styles.button} onClick={() => addItemToCart(item)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#001f3f',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        color: 'white',
    },
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '20px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    serviceName: {
        fontSize: '18px',
        margin: '10px 0',
        color: 'red',
    },
    serviceInfo: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '10px',
    },
    price: {
        fontSize: '16px',
        fontWeight: 'bold',
        margin: '10px 0',
    },
    button: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 15px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '10px',
        width: '100%',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        margin: '10px 0',
    },
};

export default StreamList;
