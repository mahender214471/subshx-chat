import React from "react";
import ChatHeader from "./ChatHeader";
import ChatList from "./ChatList";
export default function ChatLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-1/4 bg-white border-r border-gray-300">
        <ChatHeader />
        <ChatList />
      </div>
      {children}
    </div>
  );
}
