import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartItemsCount }) => {
  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      backgroundColor: '#002244',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Add shadow for modern look
    }}>
      <div style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#ff0000',
        fontFamily: 'Montserrat, sans-serif',
        textTransform: 'uppercase', // Capitalize the text
      }}>
        EzTechMovie
      </div>
      <ul style={{
        display: 'flex',
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      }}>
        <li style={{
          margin: '0 15px',
          border: '2px solid white',
          borderRadius: '8px', // Rounded corners for a modern look
          padding: '5px 15px',
          transition: 'background-color 0.3s',
        }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <i className="fas fa-film"></i> Stream List
          </Link>
        </li>
        <li style={{
          margin: '0 15px',
          border: '2px solid white',
          borderRadius: '8px',
          padding: '5px 15px',
          transition: 'background-color 0.3s',
        }}>
          <Link to="/movies" style={{ color: 'white', textDecoration: 'none' }}>
            <i className="fas fa-video"></i> Movies
          </Link>
        </li>
        <li style={{
          margin: '0 15px',
          border: '2px solid white',
          borderRadius: '8px',
          padding: '5px 15px',
          transition: 'background-color 0.3s',
        }}>
          <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>
            <i className="fas fa-shopping-cart"></i> Cart ({cartItemsCount}) {/* Display item count */}
          </Link>
        </li>
        <li style={{
          margin: '0 15px',
          border: '2px solid white',
          borderRadius: '8px',
          padding: '5px 15px',
          transition: 'background-color 0.3s',
        }}>
          <Link to="/about" style={{ color: 'white', textDecoration: 'none' }}>
            <i className="fas fa-info-circle"></i> About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
