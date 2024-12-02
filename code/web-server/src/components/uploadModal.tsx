// UploadWithModal.tsx
"use client";

import React, { useState } from "react";
import Modal from "./modal";
import UploadInput from "./uploadFile";
import "~/styles/modal.css";
import { Pdfs } from "@prisma/client";

const UploadWithModal = ({ onPdfUploadSuccess }: { onPdfUploadSuccess: (pdf: Pdfs) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button
        onClick={openModal}
        className="m-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Generate New Report
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <UploadInput closeModal={closeModal} onPdfUploadSuccess={onPdfUploadSuccess} />
      </Modal>
    </div>
  );
};

export default UploadWithModal;
