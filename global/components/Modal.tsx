"use client";
import React, { useRef } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className=" rounded-lg shadow-lg transform transition-transform duration-300 ease-out inline-block max-w-[90%] w-auto"
        style={{
          transform: isOpen ? "translateY(0)" : "translateY(-20px)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
