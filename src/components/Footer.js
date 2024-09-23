import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>© 2024 AI Chatbot. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#4CAF50',
    padding: '10px',
    textAlign: 'center',
    color: '#fff',
    position: 'fixed',
    width: '100%',
    bottom: 0,
  },
};

export default Footer;
