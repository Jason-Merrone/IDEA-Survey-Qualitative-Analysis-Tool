// src/components/Chat.tsx

"use client";

import "~/styles/globals.css";
import "~/styles/chat.css";
import { useState, useEffect, useRef } from "react";
import Button from "./button"; // Import Button if used for send button
import { getChatResponse } from "~/actions/ai";
import { getChatMessages } from "~/server/db/queries/get";
import { TypingDots } from "./loading";
import { MessageSender } from "@prisma/client";
import ReactMarkdown from "react-markdown"
import "~/styles/markdown.css"

interface ChatProps {
  chatId: number | null;
}

interface ChatBubbleInfo {
  text: string | null,
  sender: MessageSender
}

const Chat = ({ chatId }: ChatProps) => {
  const [messages, setMessages] = useState<ChatBubbleInfo[]>([]);
  const [userInput, setUserInput] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom every time a new message is added
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Clear messages when a new chat is created
    populateChatHistory()
  }, [chatId]);

  async function populateChatHistory() {
    if (chatId) {
      const existingMessages = (await getChatMessages(chatId)).data?.messages || []
      const formattedMessages = existingMessages.filter(
        (message) => message.sender != MessageSender.PROMPT
      ).map(
        (message) => ({ sender: message.sender, text: message.text })
      )
      setMessages(formattedMessages)
    }
  }

  const handleSendMessage = async () => {
    if (!userInput.trim() || chatId === null) return;

    // Add user message to chat
    const newMessages = [
      ...messages,
      { sender: MessageSender.USER, text: userInput },
      { sender: MessageSender.AI, text: null }
    ];
    setMessages(newMessages);
    setUserInput("");

    try {
      // Call the server-side createMessage function with all required arguments
      const response = (await getChatResponse(chatId, userInput)).data || ""

      // Add AI response to messages
      // TODO await for AI response
      setMessages((prev) => prev.toSpliced(-1, 1, { sender: MessageSender.AI, text: response }));
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container roboto-regular">
      <div className="messages-container" ref={messagesContainerRef}>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender == MessageSender.USER ? "user-message" : "ai-message"}>
            {msg.text == null ? <TypingDots /> : <ReactMarkdown className="markdown">{msg.text}</ReactMarkdown>}
          </div>
        ))}
      </div>

      <div className="input-container roboto-regular">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <Button text="Send" onClick={handleSendMessage} className="send-button bg-blue-500 text-white px-4 py-2 rounded" />
      </div>
    </div>
  );
};

export default Chat;
