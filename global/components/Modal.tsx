"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Animate modal in/out
  useEffect(() => {
    if (isOpen) {
      // Fade in overlay
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: "auto" });
      // Slide + scale in modal
      gsap.fromTo(
        modalRef.current,
        { y: -20, scale: 0.95, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.3, ease: "power3.out" }
      );
    } else {
      // Fade out overlay
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: "none" });
      // Slide + scale out modal
      gsap.to(modalRef.current, {
        y: -20,
        scale: 0.95,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (overlayRef.current && e.target === overlayRef.current) {
      onClose();
    }
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 opacity-0 pointer-events-none"
    >
      <div
        ref={modalRef}
        className="inline-block max-w-[90%] w-auto"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
