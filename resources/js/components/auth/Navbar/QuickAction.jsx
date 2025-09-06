"use client";
import React from "react";
import { Link } from "@inertiajs/react";

export default function QuickAction({ icon, label, href }) {
  if (href) {
    return (
      <Link
        href={href}
        className="flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer hover:bg-base-200"
      >
        {icon}
        <span className="text-xs">{label}</span>
      </Link>
    );
  }

  return (
    <button className="flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer hover:bg-base-200">
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}
