// UploadWithModal.tsx
"use client";

import React, { useState } from "react";
import Modal from "./modal";
import UploadInput from "./uploadFile";
import "~/styles/modal.css";

const UploadWithModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      
      <button onClick={openModal} className="open-modal-button">
        Upload PDF
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UploadInput closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default UploadWithModal;
