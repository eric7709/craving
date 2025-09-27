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
                padding: 1rem;
                border: 1px solid #000;
                border-radius: 0.75rem;
                text-align: center;
              }
              h2 { margin: 0 0 0.5rem; font-size: 0.9rem; font-weight: 600; }
              p { margin: 0; font-size: 0.8rem; }
              a { display: inline-block; margin-top: 0.5rem; font-size: 0.8rem; color: blue; text-decoration: underline; }
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
      <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-gray-50 rounded-xl shadow-md space-y-4 min-w-[270px]">
        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-700">QR Code</h2>

        {/* Table Info */}
        <div className="text-center text-gray-700">
          <p className="text-sm font-medium">
            Table #{selectedTable?.tableNumber}
          </p>
          <p className="text-xs text-gray-500">{selectedTable?.name}</p>
        </div>

        {/* QR Code */}
        <div ref={qrRef} className="flex flex-col bg-white items-center">
          <div className="bg-white p-3 rounded-lg shadow">
            <QRCode value={qrValue} size={200} />
          </div>
          {qrValue && (
            <a
              href={qrValue}
            target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs text-blue-600 hover:underline text-center"
            >
              Go to Menu
            </a>
          )}
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition text-xs font-medium"
        >
          <Printer size={14} />
          Print
        </button>
      </div>
    </Modal>
  );
}
