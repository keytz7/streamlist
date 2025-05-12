import React, { useState } from 'react';

const CreditCard = () => {
    const [cardNumber, setCardNumber] = useState('');

    const handleSaveCard = () => {
        if (/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
            localStorage.setItem('creditCard', cardNumber);
            alert('Card saved successfully!');
        } else {
            alert('Invalid card number format. Use: 1234 5678 9012 3456');
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#001f3f', color: 'white' }}>
            <h1>Manage Credit Card</h1>
            <input
                type="text"
                placeholder="Enter your card number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                maxLength="19" // 16 digits + 3 spaces
            />
            <button onClick={handleSaveCard}>Save Card</button>
        </div>
    );
};

export default CreditCard;