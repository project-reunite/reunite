import React from 'react';

const Header = () => {
  return(
    <div style={{
      'backgroundColor': 'rgb(40, 10, 150)',
      position: 'relative',
      bottom: '20px',
      height: '50px',
      padding: '10px',
      'paddingLeft': '30px'
  }}>
      <h2 style={{
        color: 'white'
      }}>UI Catalog</h2>
      
    </div>
  );
}

export default Header;