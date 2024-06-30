"use client";
import React from "react";
import { UserAvtar } from "./Avtar";
import InputEmoji from "react-input-emoji";
const MessageRight = () => {
  return (
    <div className="flex mb-4 cursor-pointer">
      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
        <img
          src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
          alt="User Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
        <p className="text-gray-700">Hey Bob, how's it going?</p>
      </div>
    </div>
  );
};
const MessageLeft = () => {
  return (
    <div className="flex justify-end mb-4 cursor-pointer">
      <div className="flex max-w-96 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-lg p-3 gap-3">
        <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        <img
          src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
          alt="My Avatar"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};
export default function MessageList() {
  return (
    <div className="flex-1">
      {/* Chat Header */}
      <header className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-4 text-white flex items-center">
        <UserAvtar name="MK" />
        <div className="ml-4">
          <h1 className="text-2xl font-semibold">Alice</h1>
          <p className="">Active</p>
        </div>
      </header>
      {/* Chat Messages */}
      <div className="h-screen overflow-y-auto p-4 pb-36">
        <MessageRight />
        <MessageLeft />
      </div>
      {/* Chat Input */}
      <footer className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
        <div className="flex items-center">
          <InputEmoji placeholder="Type a message" />
          <button className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white px-4 py-2 rounded-md ml-2">
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}
