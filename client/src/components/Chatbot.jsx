import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbot = ({ categoryId }) => {
  const [conversation, setConversation] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);  // Track the current step
  const [collectedInfo, setCollectedInfo] = useState({});  // Track collected information
  const [serviceSelected, setServiceSelected] = useState(false);  // Track if service is selected
  const chatboxRef = useRef(null); // Ref to the chatbox for auto-scrolling

  // Function to handle sending user input or selected option
  const sendMessage = async (message) => {
    if (!message) return;

    // Add user's message or option click to the conversation
    setConversation(prevConv => [...prevConv, { role: 'user', content: message }]);
    setIsLoading(true);

    try {
      const res = await axios.post(`http://localhost:5000/api/questions/${categoryId}`, {
        userMessage: message,
        step: step,  // Send the current step
        collectedInfo: collectedInfo,  // Send collected information
        serviceSelected: serviceSelected  // Send whether the service is selected
      });

      // Update the conversation with the bot's message
      setConversation(prevConv => [
        ...prevConv,
        { role: 'bot', content: res.data.message, options: res.data.options || [] }
      ]);

      // Update collected info, step, and service selection status
      setStep(res.data.nextStep);
      setCollectedInfo(res.data.collectedInfo || {});
      if (res.data.serviceSelected !== undefined) {
        setServiceSelected(res.data.serviceSelected);
      }

    } catch (err) {
      console.error(err);
    }

    // Clear the input field and stop loading
    setUserMessage('');
    setIsLoading(false);
  };

  // Handle clicking on an option
  const handleOptionClick = (option) => {
    sendMessage(option); // Send the selected option as a message
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight; // Auto-scroll to the bottom
    }
  }, [conversation]); // Scroll to the bottom whenever the conversation updates

  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        <div className="chatbox" ref={chatboxRef}>
          {conversation.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="avatar">{msg.role === 'user' ? 'U' : 'B'}</div>
              <div className="content">
                {msg.content}
                {/* Render options as clickable buttons if available */}
                {msg.options && msg.options.length > 0 && (
                  <div className="options">
                    {msg.options.map((option, index) => (
                      <button
                        key={index}
                        className="option-button"
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && <div className="message bot"><div className="content">Loading...</div></div>}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
            className="input-box"
          />
          <button onClick={() => sendMessage(userMessage)} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
