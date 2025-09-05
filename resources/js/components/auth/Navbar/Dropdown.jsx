"use client";
import React from "react";

export default function Dropdown({ isOpen, onClose, width = "w-80", children }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed top-16 right-0 z-50 ${width} max-h-[70vh] overflow-y-auto border border-base-200 shadow-xl rounded-2xl bg-base-100 transition-colors duration-300`}
      >
        {children}
      </div>
      <div
        className="fixed inset-0 z-40 bg-black/20 md:hidden"
        onClick={onClose}
      />
    </>
  );
}
