"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

function page() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    let value = e.target.value;
    let name = e.target.name;
    console.log(value, name);
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {};
  return (
    <div className="bg-gray-400 flex flex-col justify-center items-center h-screen">
      <main className=" w-[330px] bg-slate-700 px-4 py-11">
        <h1 className="text-center text-lg mb-3">Login</h1>
        <div className="space-y-4">
          <label htmlFor="email" className="flex flex-col">
            Email
            <input
              className="text-black"
              type="text"
              name="email"
              // placeholder="email"
              value={userData.email}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="password" className="flex flex-col">
            Password
            <input
              className="text-black"
              type="text"
              name="password"
              // placeholder="password"
              value={userData.password}
              onChange={handleChange}
            />
          </label>

          <label htmlFor="button" className="flex flex-col">
            <input
              onClick={handleSubmit}
              className="text-white px-4 py-1 bg-blue-500 cursor-pointer"
              type="submit"
              name="button"
              placeholder="password"
            />
          </label>
        </div>
        <Link
          href={"/signup"}
          className="text-center block font-bold text-xl mt-3 text-blue-600"
        >
          Signup
        </Link>
      </main>
    </div>
  );
}

export default page;
