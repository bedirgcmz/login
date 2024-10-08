"use client";
import { useState } from "react";
import { useUserContext } from "@/newcontext/AuthContext";
import { userContextType } from "@/utils/types";
import { registeredUser } from "@/utils/users";
import { useRouter } from "next/navigation"; // useRouter'ı içe aktarın
import Image from "next/image";
import Swal from "sweetalert2";

const LoginPage = () => {
  const { user, setUser, loggedIn, setLoggedIn } = useUserContext() as userContextType;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // useRouter hook'unu kullanın

  const handleLogin = () => {
    // Kullanıcı doğrulaması (örneğin bir API çağrısı)
    const loggedInUser = registeredUser.find((user) => user.name === username);

    if (loggedInUser && loggedInUser.password === password) {
      setLoggedIn(true);
      setUser(loggedInUser);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successful",
        showConfirmButton: false,
        timer: 800,
        width: "250px", // Modal genişliğini ayarlamak için
        customClass: {
          popup: "p-2 text-sm", // İçeriğin boyutunu küçültmek için
          icon: "text-xs", // İkonun boyutunu küçültmek için
          title: "text-sm", // Başlık boyutunu küçültmek için
        },
      });

      // Oturum açma başarılı olduğunda ana sayfaya yönlendir
      router.push("/");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="flex-col-reverse md:flex-row flex w-screen h-screen items-center">
      <div className="w-full md:w-1/2 bg-[#b08968] h-full flex items-center">
        <Image
          src="/images/bglogin.png"
          alt="bg-login"
          width={300}
          height={400}
          className="h-auto w-full"
        />
      </div>
      <div className="w-full md:w-1/2 md:border-l-4 h-80 md:h-full flex justify-center items-center">
        <div className="flex justify-center items-center w-full">
          {loggedIn ? (
            <div>
              <p>Welcome, {user?.name}!</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <div className="w-[80%] max-w-[400px]">
              <label htmlFor="username">Name</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-10 rounded-lg px-2 mb-3 border border-[#b08968] bg-[#e6ccb2] focus:bg-[#e6ccb2]"
              />
              <br />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 rounded-lg px-2 mb-3 border border-[#b08968] bg-[#e6ccb2] focus:bg-[#e6ccb2]"
              />
              <br />
              <button
                onClick={handleLogin}
                className="border border-[#e6ccb2] rounded-md px-6 py-[5px] shadow-xl hover:text-[#fff] hover:bg-[#b08968]"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
