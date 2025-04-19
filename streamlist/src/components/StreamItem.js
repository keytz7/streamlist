import React from 'react';

const StreamItem = ({ stream, onDelete, onEdit }) => {
    return (
        <li className="stream-item">
            <span>{stream.text}</span>
            <div className="item-buttons">
                <button className="edit-button" onClick={onEdit}>Edit</button>
                <button className="delete-button" onClick={onDelete}>Delete</button>
            </div>
        </li>
    );
};

export default StreamItem;