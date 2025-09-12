"use client";
import React, { RefObject } from "react";
import { ImagePlus, X } from "lucide-react";

type Props = {
  preview: string | null;
  onFileChange: (file: File | null) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
};

export default function MenuItemImage({
  preview,
  onFileChange,
  fileInputRef,
}: Props) {
  return (
    <div
      onClick={() => !preview && fileInputRef.current?.click()}
      className={`relative w-full border-2 border-dashed rounded-xl cursor-pointer flex items-center justify-center 
                  transition-all duration-300
                  ${preview ? "h-48 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-300 hover:border-blue-400" 
                            : "h-24 bg-gray-50 border-gray-300 hover:border-gray-400"}`}
    >
      {preview ? (
        <div className="relative h-full w-full">
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-cover rounded-lg"
          />
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-black/80 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center text-gray-400">
          <ImagePlus className="w-6 h-6" />
          <span className="text-sm font-medium mt-1">Upload Image</span>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />
    </div>
  );
}
