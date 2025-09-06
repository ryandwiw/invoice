"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Stat({ value, diff, negative }) {
    return (
        <div className="flex items-end justify-between">
            <div>
                <div className="text-3xl font-bold tracking-tight">{value}</div>
                <div className={`text-xs mt-1 ${negative ? "text-error" : "text-success"}`}>
                    {diff}
                </div>
            </div>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-10 h-10 rounded-xl bg-base-300/60"
            />
        </div>
    );
}
