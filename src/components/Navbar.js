import React from 'react';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h1 style={styles.title}>Yathath Gita Chatbot</h1>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#4CAF50',
    padding: '10px',
    textAlign: 'center',
  },
  title: {
    color: '#fff',
    margin: 0,
  },
};

export default Navbar;
