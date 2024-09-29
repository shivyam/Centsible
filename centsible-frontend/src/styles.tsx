import styled, { keyframes, createGlobalStyle } from 'styled-components';

/* Importing Google Fonts */
export const FontImport = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
`;

/* Gradient for the borders */
const gradient = keyframes`
  0% {
    border-color: blue;
  }
  50% {
    border-color: black;
  }
  100% {
    border-color: blue;
  }
`;

/* Styled Chat Container */
export const ChatContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

/* Styled Text Area */
export const TextArea = styled.textarea`
  width: 300px;
  height: 150px;
  padding: 10px;
  font-size: 16px;
  border-radius: 20px;
  border: 0.5px solid;
  resize: none;
  outline: none;
`;

/* Styled Send Button */
export const SendButton = styled.button`
  width: 160px;
  height: 50px;
  font-size: 16px;
  background-color: #e0f7fa;
  border-radius: 25px;
  border: 3px solid;
  animation: ${gradient} 4s infinite;
  cursor: pointer;
  transition: background-color 0.5s ease;

  &:hover {
    background-color: #b2ebf2;
  }
`;

/* Styled Header */
export const Header = styled.h1`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

/* Global Style */
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    background-image: url('bg.png'); /* Set the background image */
    background-size: cover; /* Ensures the image covers the entire window */
    background-position: center;
    background-repeat: no-repeat; /* Prevent repeating */
    height: 100vh; /* Make sure it covers the full viewport */
    width: 100%; /* Full width */
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
