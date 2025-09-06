"use client";
import React from "react";

export default function QuickAction({ icon, label }) {
    return (
        <button className="flex flex-col items-center gap-1 p-3 rounded-lg cursor-pointer hover:bg-base-200">
            {icon}
            <span className="text-xs">{label}</span>
        </button>
    );
}
