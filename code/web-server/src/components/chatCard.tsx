import "~/styles/globals.css";
import "~/styles/chatCard.css";
import React from "react";

interface ChatCardProps {
  chatId: number;
  classIds: number[];
  onViewChat: (chatId: number) => void;
  onDeleteChat: (chatId: number) => void; 
}

const ChatCard: React.FC<ChatCardProps> = ({ chatId, classIds, onViewChat, onDeleteChat }) => {
  return (
    <div className="roboto-regular flex-wrap chatcard-textsize chat-card">
      <h2
        className="chat-link roboto-bold"
        onClick={() => onViewChat(chatId)}
      >
        Chat: {chatId}
      </h2>
      <button
        onClick={() => onDeleteChat(chatId)} 
        className="card-button red"
      >
        Delete
      </button>
    </div>
  );
};

export default ChatCard;
