"use client";
import React, { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatList from "./ChatList";

import { useSelector, useDispatch } from "react-redux";
import { updateChatList } from "../redux/appSlice";
export default function ChatLayout({ children }) {
  const dispach = useDispatch();
  const appState = useSelector((store) => store?.AppState);
  console.log("app state =============>", appState);

  return (
    <section className="flex h-screen overflow-hidden">
      <div className="w-1/4 bg-white border-r border-gray-300">
        <ChatHeader />
        <ChatList chatData={appState?.chatList}/>
      </div>
      {children}
    </section>
  );
}
