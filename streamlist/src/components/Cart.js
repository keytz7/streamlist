import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cart = ({ cartItems, setCartItems }) => {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        // Calculate total price
        const total = cartItems.reduce((total, item) => total + item.price * item.amount, 0);
        setTotalPrice(total);

        // Save the updated cart to localStorage whenever cartItems changes
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const updateAmount = (item, amount) => {
        const newAmount = parseInt(amount, 10) || 1;

        if (newAmount < 1) {
            removeItem(item);
        } else {
            const updatedCart = cartItems.map(cartItem =>
                cartItem.id === item.id ? { ...cartItem, amount: newAmount } : cartItem
            );
            setCartItems(updatedCart);
        }
    };

    const removeItem = (item) => {
        const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedCart);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div style={styles.cardContainer}>
                        {cartItems.map(item => (
                            <div key={item.id} style={styles.card}>
                                <img src={item.img} alt={item.service} style={styles.image} />
                                <h2 style={styles.serviceName}>{item.service}</h2>
                                <p style={styles.price}>${item.price} x
                                    <input
                                        type="number"
                                        value={item.amount}
                                        min="1"
                                        onChange={(e) => updateAmount(item, e.target.value)}
                                        style={styles.quantityInput}
                                    />
                                </p>
                                <button style={styles.removeButton} onClick={() => removeItem(item)}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <h2 style={styles.total}>Total: ${totalPrice.toFixed(2)}</h2>
                    <Link to="/credit-card">
                        <button style={styles.checkoutButton}>Checkout</button>
                    </Link>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#001f3f',
        color: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        padding: '15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    image: {
        width: '50px',
        height: 'auto',
        borderRadius: '8px',
        marginRight: '10px',
    },
    serviceName: {
        fontSize: '18px',
        color: 'red',
        margin: '0',
    },
    price: {
        fontSize: '16px',
        fontWeight: 'bold',
    },
    quantityInput: {
        width: '50px',
        marginLeft: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '5px',
    },
    removeButton: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
    },
    checkoutButton: {
        backgroundColor: '#ff0000',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 15px',
        cursor: 'pointer',
        marginTop: '20px',
    },
    total: {
        textAlign: 'right',
        fontSize: '20px',
        marginTop: '20px',
    },
};

export default Cart;



