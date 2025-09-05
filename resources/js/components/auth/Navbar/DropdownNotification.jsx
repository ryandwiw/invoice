"use client";
import React from "react";
import Dropdown from "./Dropdown";

export default function DropdownNotification({ isOpen, onClose }) {
  return (
    <Dropdown isOpen={isOpen} onClose={onClose} width="w-80">
      <div className="p-3 text-base font-semibold text-center border-b rounded-t-2xl border-base-300 bg-base-200">
        Notifications
      </div>
      <ul className="flex flex-col divide-y divide-base-200">
        <li className="flex items-center justify-between p-3 text-sm hover:bg-base-300">
          <span>New user registered</span>
          <span className="text-xs text-base-content/70">2 min ago</span>
        </li>
        <li className="flex items-center justify-between p-3 text-sm hover:bg-base-300">
          <span>Server restarted</span>
          <span className="text-xs text-base-content/70">10 min ago</span>
        </li>
        <li className="flex items-center justify-between p-3 text-sm hover:bg-base-300">
          <span>Update available</span>
          <span className="text-xs text-base-content/70">1 hour ago</span>
        </li>
        <li className="flex items-center justify-center p-3 text-sm font-medium cursor-pointer hover:bg-primary/20 text-primary rounded-b-2xl">
          View All
        </li>
      </ul>
    </Dropdown>
  );
}
