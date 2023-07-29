"use client";

import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function page() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [buttonMessage, setButtonMessage] = useState("Submit");

  const handleChange = (e: any) => {
    let value = e.target.value;
    let name = e.target.name;
    console.log(value, name);
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      setButtonMessage("Submitting...");
      let response = await axios.post("/api/signup", userData);
      console.log(response);
      if (response.status === 200) {
        router.push("/login");
        setButtonMessage("Submit");
      }
    } catch (error: any) {
      setButtonMessage("Submit");

      toast.error(error.message);
      console.log("failed " + error.message);
    }
  };
  return (
    <div className="bg-gray-400 flex flex-col justify-center items-center h-screen">
      <main className=" w-[330px] bg-slate-700 px-4 py-11">
        <h1 className="text-center text-lg mb-3">SignUp</h1>
        <div className="space-y-4">
          <label htmlFor="username" className="flex flex-col">
            User Name
            <input
              className="text-black"
              type="text"
              name="username"
              // placeholder="user name"
              value={userData.username}
              onChange={handleChange}
            />
          </label>

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

          <button
            type="submit"
            className="text-white px-4 py-1 w-full bg-blue-500 cursor-pointer mt-4"
            onClick={handleSubmit}
          >
            {buttonMessage}
          </button>
        </div>
        <Link
          href={"/login"}
          className="text-center block font-bold text-xl mt-3 text-blue-600"
        >
          Login
        </Link>
      </main>
    </div>
  );
}

export default page;
