"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

import React, { useEffect, useState } from "react";

function page() {
  const router = useRouter();

  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    try {
      let user = await axios.get("/api/user");
      console.log(user.data.user);
      setUserData(user.data.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      let response = await axios.get("/api/logout");
      console.log(response);
      if (response.data.success) {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h2 className="text-lg"> Profile page</h2> <br />
      <h3 className="uppercase mt-3">Name: {userData?.username}</h3>
      <h3 className="uppercase mt-3">Email: {userData?.email}</h3>
      <h3 className="uppercase mt-3">Role: {userData?.role}</h3>
      <h3 className="uppercase mt-3">isVerified: {userData?.isVerified}</h3>
      <hr />
      <button
        onClick={handleLogout}
        className="bg-red-500 px-6 py-2 m-8 rounded-md"
      >
        Logout
      </button>
    </div>
  );
}

export default page;
