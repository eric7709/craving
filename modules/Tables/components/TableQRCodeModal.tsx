'use client';
import React, { useRef } from "react";
import { useTableUtilStore } from "../store/useTableUtilStore";
import Modal from "@/global/components/Modal";
import QRCode from "react-qr-code";
import { Printer } from "lucide-react";

export default function TableQRCodeModal() {
  const { activeModal, closeModal, selectedTable } = useTableUtilStore();
  const qrRef = useRef<HTMLDivElement>(null);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const qrValue = `${baseUrl}/menu/${selectedTable?.url}`;

  const handlePrint = () => {
    if (qrRef.current) {
      const printWindow = window.open("", "_blank");
      if (!printWindow) return;
      printWindow.document.write(`
        <html>
          <head>
            <title>Print QR Code</title>
            <style>
              body { 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                margin: 0;
                font-family: sans-serif;
              }
              .qr-card {
                padding: 2rem;
                border: 2px solid #000;
                border-radius: 1rem;
                text-align: center;
              }
              h2 { margin: 0 0 1rem; font-size: 1.5rem; }
            </style>
          </head>
          <body>
            <div class="qr-card">
              <h2>Table #${selectedTable?.tableNumber} - ${selectedTable?.name}</h2>
              ${qrRef.current.innerHTML}
            </div>
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
    <Modal isOpen={activeModal === "qrcode"} onClose={closeModal}>
      <div className="flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-lg space-y-5 min-w-[320px]">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">QR Code</h2>

        {/* Table Info */}
        <div className="text-center text-gray-700">
          <p className="text-lg font-semibold">
            Table #{selectedTable?.tableNumber}
          </p>
          <p className="text-sm">{selectedTable?.name}</p>
        </div>

        {/* QR Code */}
        <div ref={qrRef} className="flex flex-col items-center">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <QRCode value={qrValue} size={220} />
          </div>
          {qrValue && (
            <a
              href={qrValue}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 text-sm text-blue-600 hover:underline break-all text-center max-w-[260px]"
            >
              {qrValue}
            </a>
          )}
        </div>
        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition font-medium"
        >
          <Printer size={18} />
          Print QR
        </button>
      </div>
    </Modal>
  );
}
