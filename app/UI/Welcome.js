
import React from 'react'

export default function Welcome({name}) {
  return (
    <div className="w-full h-full flex items-center justify-center">
    <div className="flex flex-col items-center">
      <img
        className="w-[300px] h-[300px] rounded-full"
        src="/images/login2.gif"
        alt=""
        loading="lazzy"
      />
      <p className="mt-6 text-base  font-[800px]">
        Welcome Mr. {name}
      </p>
    </div>
  </div>
  )
}
