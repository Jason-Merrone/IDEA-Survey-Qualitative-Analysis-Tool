"use client";
import "~/styles/globals.css";
import "~/styles/chat.css";
import { useState, useEffect } from "react";
import Button from "./button";
import Chat from "./chat";
import ChatCard from "./chatCard";
import Modal from "./modal";
import { createChat, createMessage } from "~/server/db/queries/create";
import { getPdfTextLines, getUserChats, getUserPdfs } from "~/server/db/queries/get";
import { deleteChat } from "~/server/db/queries/delete";
import UploadInput from "./uploadFile";
import { getUserSession } from "~/actions/session";
import { MessageSender } from "@prisma/client";

interface Chat {
  id: number;
  classIds: number[];
  semesterIds: number[];
}

interface Pdf {
  id: number;
  pdfName: string;
}

const ChatApp = () => {
  const [chatId, setChatId] = useState<number | null>(null);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfs, setPdfs] = useState<Pdf[]>([]);
  const [selectedPdfIds, setSelectedPdfIds] = useState<number[]>([]);

  useEffect(() => {
    fetchChatHistory();
    fetchPdfs();
  }, []);

  const fetchChatHistory = async () => {
    const response = await getUserChats();
    if (response.data) {
      setChatHistory(response.data.chats);
    }
  };

  const fetchPdfs = async () => {
    const user = await getUserSession(); // Fetch user session dynamically
    if (!user) {
      console.error("User not logged in");
      return;
    }
    const response = await getUserPdfs(user.aNumber);
    if (response.data) {
      setPdfs(response.data);
    }
  };

  const togglePdfSelection = (id: number) => {
    setSelectedPdfIds((prev) =>
      prev.includes(id) ? prev.filter((pdfId) => pdfId !== id) : [...prev, id]
    );
  };

  const handleCreateChat = async () => {
    try {
      const response = await createChat("Request example", "2024", "CS1400", "A");
      if (response.data) {
        const newChatId = response.data.id;
        setChatId(newChatId);

        // Send the selected PDFs as the first message
        const pdfTextLines = await Promise.all(selectedPdfIds.map(
          async (id) => (await getPdfTextLines(id)).data?.textLines ?? []
        ))
        console.log('Got all PDF text lines for ' + JSON.stringify(selectedPdfIds))
        const pdfTextBody = pdfTextLines
          .flat()
          .map((pdfTextLine) => pdfTextLine.lineText)
          .join("\n")
        console.log(pdfTextBody)
        await createMessage(pdfTextBody, newChatId, MessageSender.PROMPT);

        fetchChatHistory(); // Refresh chat history
      } else {
        console.error("Failed to create chat: No data in response");
      }
    } catch (error) {
      console.error("Error creating chat:", error);
    } finally {
      setIsModalOpen(false); // Close the modal
      setSelectedPdfIds([]); // Reset the selection
    }
  };

  const handleDeleteChat = async (chatId: number) => {
    const response = await deleteChat(chatId);
    if (response.data) {
      fetchChatHistory();
      if (chatId === chatId) {
        setChatId(null);
      }
    }
  };

  function closeModal(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="chat-app-container">
      {/* Sidebar for Create Button and Chat History */}
      <div className="chat-sidebar">
        <Button
          text="Create New Chat"
          onClick={() => setIsModalOpen(true)}
          className="roboto-bold"
        />
        <div className="chat-history">
          {chatHistory.map((chat) => (
            <ChatCard
              key={chat.id}
              chatId={chat.id}
              classIds={chat.classIds}
              onViewChat={(id) => setChatId(id)}
              onDeleteChat={handleDeleteChat}
            />
          ))}
        </div>
      </div>

      {/* Main Chat Window */}
      <div className="chat-main">
        <Chat chatId={chatId} />
      </div>

      {/* Modal for Selecting PDFs */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Select PDFs for the Chat</h3>
        <ul>
          {pdfs.map((pdf) => (
            <li key={pdf.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedPdfIds.includes(pdf.id)}
                  onChange={() => togglePdfSelection(pdf.id)}
                />
                {pdf.pdfName}
              </label>
            </li>
          ))}
        </ul>
        <h4>Or Upload a New PDF</h4>
        <UploadInput closeModal={closeModal} />
        <div className="modal-actions">
          <Button
            text="Confirm"
            onClick={handleCreateChat}
            disabled={!selectedPdfIds.length}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ChatApp;
