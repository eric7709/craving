'use client';
import React, { useEffect, useRef } from "react";
import { useTableUtilStore } from "../store/useTableUtilStore";
import Modal from "@/global/components/Modal";
import QRCode from "react-qr-code";

export default function TableQRCodeModal() {
  const { activeModal, closeModal, selectedTable } = useTableUtilStore();
  const qrRef = useRef<HTMLDivElement>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!
  const qrValue = `${baseUrl}/menu/${selectedTable?.url}`;
  const handlePrint = () => {
    if (qrRef.current) {
      const printWindow = window.open("", "_blank");
      if (!printWindow) return;
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
          </head>
          <body style="display:flex; justify-content:center; align-items:center; height:100vh;">
            ${qrRef.current.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <Modal isOpen={activeModal == "qrcode"} onClose={closeModal}>
      <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md space-y-4 min-w-[300px]">
        <h2 className="text-xl font-semibold">Table QR Code</h2>
        <b>#{selectedTable?.tableNumber} {selectedTable?.name}</b>

        <div ref={qrRef} className="flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg shadow">
            <QRCode
              value={qrValue}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>

          {/* Make the QR link clickable */}
          {qrValue && (
            <a
              href={qrValue}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-sm text-blue-600 hover:underline break-all text-center"
            >
              {qrValue}
            </a>
          )}
        </div>
        <button
          onClick={handlePrint}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Print
        </button>
      </div>
    </Modal>
  );
}
