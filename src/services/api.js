// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your actual backend URL

export const sendChatMessage = async (userMessage) => {
  try {
    const response = await axios.post(`${API_URL}/api/chat-complete`, { userMessage });
    return response.data; // Adjust this based on your backend response structure
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const generateImage = async (prompt) => {
  try {
    const response = await axios.post(`${API_URL}/api/image-generator`, { prompt });
    return response.data; // Adjust this based on your backend response structure
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};
