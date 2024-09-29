"use client";
import React, { useState } from "react";
import { useUserContext } from "@/newcontext/AuthContext";
import { userContextType } from "@/utils/types";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // React Icons kütüphanesi ekleniyor
import Link from "next/link";

export default function Profile() {
  const { user, setUser, loggedIn, setLoggedIn } = useUserContext() as userContextType;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen mt-8">
      <h1 className="w-full text-center text-3xl">My Profile</h1>
      <div className="flex flex-col md:flex-row items-center p-8 rounded-lg shadow-lg w-full max-w-4xl">
        {/* Kullanıcı Resmi */}
        <div className="md:w-1/3 flex justify-center md:justify-start mb-6 md:mb-0">
          <img
            src={user?.image}
            alt={user?.name}
            className="w-40 h-40 rounded-full border-4 border-[#b08968] shadow-sm"
          />
        </div>

        {/* Kullanıcı Bilgileri */}
        <div className="md:w-2/3 flex flex-col items-start justify-center">
          <span>Name</span>
          <h1 className="text-2xl mb-4">{user?.name}</h1>
          <span>Password</span>
          <div className="flex items-center w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={user?.password}
              readOnly
              className="w-46 px-4 h-[42px] border rounded-l-lg outline-none"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="px-4 h-[40px] bg-[#b08968] text-[#e6ccb2] text-xl hover:text-white border-l rounded-r-lg"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Favori Listesi Linki */}
          <div className="flex items-center">
            <Link href="/favorite" passHref>
              <button className="px-4 py-2 bg-[#b08968] text-[#e6ccb2] hover:text-white rounded-lg">
                Go to Favorite List
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
