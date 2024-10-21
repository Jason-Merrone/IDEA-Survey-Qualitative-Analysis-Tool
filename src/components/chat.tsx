"use client";
import "~/styles/globals.css";
import "~/styles/chat.css";
import { useState, useEffect, useRef } from "react";

const Chat = () => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]); // Chat messages
  const [userInput, setUserInput] = useState(""); // User input
  const messagesContainerRef = useRef<HTMLDivElement>(null); // Reference to the messages container

  // Function to scroll the chat container to the bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  // Scroll to the bottom every time a new message is added
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulated API call function (for now)
  const getAIResponse = async (userMessage: string) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(`AI says: ${userMessage}`); // Simulated response from AI
      }, 1000);
    });
  };

  // Handle sending message
  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput(""); // Clear the input field

    try {
      // Call the simulated API function (this will later be replaced by a real API call)
      const aiResponse = await getAIResponse(userInput);

      // Add AI response to chat
      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
    } catch (error) {
      console.error("Error getting AI response:", error);
    }
  };

  return (
    <div className="chat-container roboto-regular">
      {/* Messages container */}
      <div className="messages-container" ref={messagesContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? "user-message" : "ai-message"}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input box */}
      <div className="input-container roboto-regular">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
