import React, { useState } from 'react'; 

const StreamList = () => {
    const [input, setInput] = useState(''); 

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(input); 
        setInput(''); 
    }; 

    return (
        <div>
            <h1>StreamList</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add a movie or show"
                />
                <button type="submit">Add</button>
            </form>
        </div>
    );
};

export default StreamList; 