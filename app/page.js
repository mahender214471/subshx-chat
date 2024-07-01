"use client";
import React from "react";
import io from "socket.io-client";
import ChatLayout from "./UI/ChatLayout";
import MessageList from "./UI/MessageList";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./UI/Loading";
import Welcome from "./UI/Welcome";
import { updateChatList, updateMessageList } from "./redux/appSlice";
export default function page() {
  const dispach = useDispatch();
  const router = useRouter();
  const appState = useSelector((store) => store?.AppState);
  const { isAuthonicate, selectedRecever, loginUserDetails, messageList } =
    appState;
  const socket = io(process?.env?.NEXT_PUBLIC_BASE_URL, {
    extraHeaders: {
      authorization: appState?.token,
    },
  });
  console.log("connected ==============>", socket?.connected);
  socket.on("connectListenerr", () => {
    console.log("Connected to server");
  });
  useEffect(() => {
    socket.on("connectListenerr", () => {
      console.log("Connected to server");
    });
    socket.on("errorNotifyer", (data) => {
      console.log("Failed to connet", data);
    });
    socket.emit("chats");
    socket.on("chats-list", (data) => {
      dispach(updateChatList(data));
    });
    socket.on("get-message-listing-status", (data) => {
      console.log('Messages ===============>' , data);
      dispach(updateMessageList(data));
    });
  }, []);
  if (selectedRecever?.chatId) {
    socket.emit("get-message-listing", { chatId: selectedRecever?.chatId });
  }
  useEffect(() => {
    if (!isAuthonicate) router.push("/auth/login");
  }, []);
  return isAuthonicate ? (
    <ChatLayout>
      {selectedRecever?.chatId ? (
        <MessageList
          name={selectedRecever?.recever?.name}
          image={selectedRecever?.recever?.image}
          messages={messageList}
        />
      ) : (
        <Welcome name={loginUserDetails?.name} />
      )}
    </ChatLayout>
  ) : (
    <Loading />
  );
}
