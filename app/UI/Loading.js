import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-pink-500">
      <div className="flex flex-col items-center">
        <img
          className="w-[500px] h-[500px] rounded-full"
          src="/images/login2.gif"
          alt=""
          loading="lazzy"
        />
        <p className="mt-6 text-base text-white font-[800px]">
          Loading please wait...
        </p>
      </div>
    </div>
  );
}
