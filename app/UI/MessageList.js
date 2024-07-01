"use client";
import React from "react";
import { UserAvtar } from "./Avtar";
import InputEmoji from "react-input-emoji";
const MessageRight = ({ data }) => {
  return (
    <div className="flex mb-4 cursor-pointer">
      <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
        <img
          src={
            data?.user?.image ? data?.user?.image : "/images/placeholder.jpg"
          }
          alt={data?.user?.name}
          className="w-8 h-8 rounded-full"
        />
      </div>
      <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
        <p className="text-gray-700">{data?.message}</p>
      </div>
    </div>
  );
};
const MessageLeft = ({ data }) => {
  return (
    <div className="flex justify-end mb-4 cursor-pointer">
      <div className="flex max-w-96 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-lg p-3 gap-3">
        <p>{data?.message}</p>
      </div>
      <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
        <img
          src={
            data?.user?.image ? data?.user?.image : "/images/placeholder.jpg"
          }
          alt={data?.user?.name}
          className="w-8 h-8 rounded-full"
        />
      </div>
    </div>
  );
};
export default function MessageList({ image, name, online, messages }) {
  return (
    <div className="flex-1">
      {/* Chat Header */}
      <header className="bg-gradient-to-r from-fuchsia-500 to-pink-500 p-4 text-white flex items-center">
        <UserAvtar src={image} name={name?.slice(0, 2)} />
        <div className="ml-4">
          <h1 className="text-2xl font-semibold">{name}</h1>
          <p className="">
            {online ? (online == 1 ? "Active" : "Offline") : "Offline"}
          </p>
        </div>
      </header>
      {/* Chat Messages */}
      <div className="h-screen overflow-y-auto p-4 pb-36">
        {messages?.map((data, key) => {
          return data?.type == 1 ? (
            <MessageRight key={key} data={data} />
          ) : (
            <MessageLeft data={data} key={key} />
          );
        })}
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
