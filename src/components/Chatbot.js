// src/components/Chatbot.js
import React, { useState } from 'react';
import { sendChatMessage, generateImage } from '../services/api';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!userMessage) return;

    const newMessages = [...messages, { text: userMessage, sender: 'user' }];
    setMessages(newMessages);
    setUserMessage('');
    setIsLoading(true);

    try {
      const aiMessage = await sendChatMessage(userMessage);
      setMessages([...newMessages, { text: aiMessage, sender: 'bot' }]);
    } catch (error) {
      setMessages([...newMessages, { text: 'Error: Unable to reach AI', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  // New function to handle image generation
  const handleGenerateImage = async () => {
    if (!userMessage) return;

    const newMessages = [...messages, { text: `Generating image for: ${userMessage}`, sender: 'user' }];
    setMessages(newMessages);
    setUserMessage('');
    setIsLoading(true);

    try {
      const imageUrl = await generateImage(userMessage);
      setMessages([...newMessages, { text: 'Image generated:', imageUrl, sender: 'bot', isImage: true }]);
    } catch (error) {
      setMessages([...newMessages, { text: 'Error: Unable to generate image', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatWindow}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: message.sender === 'user' ? '#4CAF50' : '#f1f1f1',
              color: message.sender === 'user' ? '#fff' : '#000',
            }}
          >
            {message.isImage ? (
              <img src={message.imageUrl} alt="Generated" style={styles.image} />
            ) : (
              message.text
            )}
          </div>
        ))}
        {isLoading && <div style={styles.loading}>Thinking...</div>}
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Ask something..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
        <button onClick={handleGenerateImage} style={styles.imageButton}>
          Generate Image
        </button>
      </div>
    </div>
  );
};

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'calc(100vh - 100px)',
    justifyContent: 'center',
  },
  chatWindow: {
    width: '60%',
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginBottom: '10px',
  },
  message: {
    padding: '10px 20px',
    borderRadius: '10px',
    marginBottom: '10px',
    maxWidth: '60%',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '60%',
  },
  input: {
    width: '70%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  imageButton: {
    backgroundColor: '#FF5722',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  loading: {
    textAlign: 'center',
    color: '#999',
  },
  image: {
    maxWidth: '100%',
    borderRadius: '10px',
    marginTop: '10px',
  },
};

export default Chatbot;
