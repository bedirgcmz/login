"use client";
import { useUserContext } from "@/newcontext/AuthContext";
import { userContextType } from "@/utils/types";

const Header = () => {
  const userContext = useUserContext();
  const { user } = userContext as userContextType;
  return (
    <div
      className="w-full bg-cover bg-center "
      style={{ backgroundImage: "url('/images/bgheader.png')" }}
    >
      <h1 className="text-center text-5xl md:text-6xl z-20 py-6 bg-[#b08968] text-[#e6ccb2] charmonman-bold header-bg">
        "Cooking is an art"
      </h1>
      <p className="w-full text-center text-xl pb-2">{user && `Welcome ${user.name}`}</p>
    </div>
  );
};

export default Header;
