import React from "react";
import { Input } from "@/components/ui/input";
const List = ({ name, image, lastMessage }) => {
  return (
    <div className="flex  justify-between mb-4 cursor-pointer hover:bg-gradient-to-r from-fuchsia-500 to-pink-500 p-2 rounded-md">
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
          <img
            src={image}
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-gray-600">{lastMessage}</p>
        </div>
      </div>
      <div className="">
        <p className="text-gray-400 text-[14px]">an hour ago</p>
      </div>
    </div>
  );
};
export default function ChatList() {
  const listing = [
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
    {
      name: "Mahender",
      image: "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato",
      lastMessage: "hello",
      count: 2,
      time: "1h ago",
    },
  ];
  return (
    <div className="h-screen">
      <div className="px-4 py-6">
        <Input placeholder="Search"  className="w-full h-12 rounded-xl"/>
      </div>
      <div className="overflow-y-auto h-full px-4 py-4">
        {listing?.map((data, index) => {
          return (
            <List
              key={index}
              name={data?.name}
              image={data?.image}
              lastMessage={data?.lastMessage}
            />
          );
        })}
      </div>
    </div>
  );
}
