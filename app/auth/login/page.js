"use client";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginAPI } from "@/app/redux/appSlice";
import { useEffect } from "react";
export default function page() {
  const dispach = useDispatch();
  const router = useRouter();
  const { loading, sucess } = useSelector(
    (store) => store?.AppState?.loginState
  );
  useEffect(() => {
    if (sucess) {
      router.push("/");
    }
  }, [sucess]);
  const [form, setForm] = useState({
    loginID: "",
    password: "",
  });
  const handdleFormChnage = (event) => {
    const name = event?.target?.name;
    const value = event?.target?.value;

    setForm((state) => {
      state[name] = value;
      return { ...state };
    });
  };
  const handdleFormSubmit = (event) => {
    event.preventDefault();
    dispach(loginAPI(form));
  };
  return (
    <section className="bg-white">
      <div className="w-full h-[100vh] flex">
        <div className="w-1/2 h-full hidden sm:hidden md:flex lg:flex xl:flex items-center justify-center bg-gradient-to-r from-fuchsia-500 to-pink-500">
          <div className="flex flex-col items-center">
            <img
              className="w-[500px] h-[500px] rounded-full"
              src="/images/login2.gif"
              alt=""
              loading="lazzy"
            />
            <p className="mt-6 text-base text-white font-[800px]">
              Expolre the new chat exprience with
              <Link href="#" title="" className="font-medium pl-2">
                Subbx Infotech
              </Link>
            </p>
          </div>
        </div>
        <div className="w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2  h-full flex items-center justify-center p-4">
          <div className="">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Login to contionus
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                title=""
                className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700"
              >
                signup
              </Link>
            </p>
            <form method="POST" className="mt-8" onSubmit={handdleFormSubmit}>
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email &amp; Phone{" "}
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="loginID"
                      value={form?.loginID}
                      onChange={handdleFormChnage}
                      placeholder="Enter your login ID"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                        />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      value={form?.password}
                      onChange={handdleFormChnage}
                      placeholder="Enter your password"
                      className="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-500 to-pink-500 focus:outline-none hover:opacity-80 focus:opacity-80"
                  >
                    {loading ? "Please wait .." : "Login"}
                  </button>
                </div>
              </div>
            </form>
            <p className="mt-5 text-sm text-gray-600">
              All right reserved under by Subbx Infotech{" "}
              <a
                href="#"
                title=""
                className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
              >
                Privacy Policy
              </a>{" "}
              &amp;
              <a
                href="#"
                title=""
                className="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
              >
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
