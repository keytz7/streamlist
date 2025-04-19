import React, { useState } from 'react';

const StreamList = () => {
  const [input, setInput] = useState('');
  const [streams, setStreams] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

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

  const handleDelete = (id) => {
    setStreams(streams.filter(stream => stream.id !== id));
  };

  const handleComplete = (id) => {
    setStreams(streams.map(stream => 
      stream.id === id ? { ...stream, completed: !stream.completed } : stream
    ));
  };

  const handleEdit = (id) => {
    const streamToEdit = streams.find(stream => stream.id === id);
    setInput(streamToEdit.name);
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontFamily: 'Montserrat, sans-serif' }}>Stream List</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Add or edit a stream"
          style={{ 
            padding: '10px', 
            width: '300px', 
            marginRight: '10px',
            border: '2px solid #444444', // Darker border for better visibility
            borderRadius: '5px', // Rounded corners
            transition: 'border 0.3s',
            fontSize: '16px', // Adjust font size for better visibility
          }}
          onFocus={(e) => e.target.style.borderColor = '#00ff00'} // Change border color on focus
          onBlur={(e) => e.target.style.borderColor = '#444444'} // Revert border color on blur
        />
        <button type="submit" style={{
          padding: '10px',
          backgroundColor: '#ff0000',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          transition: 'background-color 0.3s',
        }}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </form>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {streams.map(stream => (
          <li key={stream.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            margin: '10px 0',
            border: '2px solid #ff0000', // Red border for each item
            borderRadius: '8px', // Rounded corners
            padding: '10px',
            backgroundColor: '#000000', // Black background for items
            color: 'white', // White text for visibility
          }}>
            <span style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              {stream.name}
              {stream.completed && <span style={{ color: '#0000ff', marginLeft: '5px', fontSize: '20px' }}>✔️</span>} {/* Modern */}
            </span>
            <div>
              <button onClick={() => handleComplete(stream.id)} style={{ marginRight: '5px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                <i className="fas fa-check" style={{ color: '#00ff00' }}></i>
              </button>
              <button onClick={() => handleEdit(stream.id)} style={{ marginRight: '5px', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                <i className="fas fa-edit" style={{ color: '#0000ff' }}></i>
              </button>
              <button onClick={() => handleDelete(stream.id)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}>
                <i className="fas fa-trash" style={{ color: '#ff0000' }}></i>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StreamList;
