import React from "react";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/appSlice";
const List = ({ data }) => {
  const dispach = useDispatch();
  const { recever } = data;
  const haddleCllick = () => {
    dispach(setSelectedUser(data));
  };
  return (
    <div
      onClick={haddleCllick}
      className="flex  justify-between mb-4 cursor-pointer hover:bg-gradient-to-r from-fuchsia-500 to-pink-500 p-2 rounded-md"
    >
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
          <img
            src={
              recever?.image !== "" ? recever?.image : "/images/placeholder.jpg"
            }
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{recever?.name}</h2>
          <p className="text-gray-600">{data?.lastMessage}</p>
        </div>
      </div>
      <div className="">
        <p className="text-gray-400 text-[14px]">{moment(data?.date).from()}</p>
      </div>
    </div>
  );
};
export default function ChatList({ chatData }) {
  return (
    <div className="h-screen">
      <div className="px-4 py-6">
        <Input placeholder="Search" className="w-full h-12 rounded-xl" />
      </div>
      <div className="overflow-y-auto h-full px-4 py-4">
        {chatData?.map((data, index) => {
          return <List key={index} data={data} />;
        })}
      </div>
    </div>
  );
}
