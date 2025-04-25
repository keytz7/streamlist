import React, { useState, useEffect } from 'react';

const StreamList = () => {
    const [input, setInput] = useState('');
    const [streams, setStreams] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const storedStreams = localStorage.getItem('streams');
        if (storedStreams) {
            setStreams(JSON.parse(storedStreams));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('streams', JSON.stringify(streams));
    }, [streams]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim()) {
            if (isEditing) {
                setStreams(streams.map(stream => 
                    stream.id === editId ? { ...stream, name: input } : stream
                ));
                setIsEditing(false);
                setEditId(null);
            } else {
                setStreams([...streams, { id: Date.now(), name: input, completed: false }]);
            }
            setInput('');
        }
    };

    // Existing functions (handleDelete, handleComplete, handleEdit) stay the same...

    return (
        <div style={{ padding: '20px' }}>
            <h1 style={{ fontFamily: 'Montserrat, sans-serif' }}>Stream List</h1>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Add or edit a stream"
                />
                <button type="submit">{isEditing ? 'Update' : 'Add'}</button>
            </form>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {streams.map(stream => (
                    <li key={stream.id}>
                        <span>{stream.name}</span>
                        {/* Buttons for complete/edit/delete */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StreamList;
