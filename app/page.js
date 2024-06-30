import React from "react";
import ChatLayout from "./UI/ChatLayout";
import MessageList from "./UI/MessageList";
export default function page() {
  return (
    <ChatLayout>
      <MessageList />
    </ChatLayout>
  );
}
