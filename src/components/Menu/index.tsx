"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { AiFillHome } from "react-icons/ai";
import { RiLoginCircleFill, RiLoginCircleLine } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";
import { useUserContext } from "@/context/AuthContext";
import { userContextType } from "@/utils/types";

const categories = ["Seafood", "Vegetarian", "Chicken", "Dessert", "Beef"];

const Menu = () => {
  const userContext = useUserContext();
  const { loggedIn, setLoggedIn, user, setUser } = userContext as userContextType;
  // Menü açılma/kapama durumu
  const [menuOpen, setMenuOpen] = useState(false);

  // Menü toggle işlevi
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Menü kapatma işlevi (menü dışına tıklama ve link tıklama)
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
    // setUsername("");
    // setPassword("");
  };

  return (
    <div className="relative">
      {/* Ana menü çubuğu */}
      <div className="flex items-center justify-between h-10 px-4 bg-[#e6ccb2] border-b border-gray-300">
        <Link
          href="/"
          className="items-center flex justify-center text-2xl text-[#b08968]  hover:text-[#9c6644]"
        >
          <AiFillHome />
        </Link>

        {/* Ortada Liste Elemanları */}
        {loggedIn ? (
          <ul className="hidden md:flex gap-2 md:gap-4 justify-center list-none p-0 m-0">
            {categories.map((category) => (
              <li key={category}>
                {/* Kategoriye göre dinamik linkleme */}
                <Link href={`/category/${category.toLowerCase()}`} legacyBehavior>
                  <a className="flex items-center justify-center h-10 px-3 transition duration-200 ease-in-out text-[#7f5539] hover:bg-[#9c6644] hover:text-[#e6ccb2]">
                    {category}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Please log in to see categories</p>
        )}

        {/* Sağ Taraf: Login Butonu */}
        <div className="hidden md:flex justify-end">
          <Link href="/login" legacyBehavior>
            <a className="flex items-center justify-center h-8 px-4 text-[#7f5539] border border-[#b08968] rounded hover:bg-[#9c6644] hover:text-[#e6ccb2]">
              {loggedIn ? (
                <div onClick={handleLogout} className="flex w-20 items-center justify-center">
                  <span className="me-2">Logout</span> <RiLoginCircleLine />
                </div>
              ) : (
                <div className="flex w-20 items-center justify-center">
                  <span className="me-2">Login</span> <RiLoginCircleFill />{" "}
                </div>
              )}
            </a>
          </Link>
          <Link href="/login" legacyBehavior>
            <FaRegUserCircle />
          </Link>
        </div>

        {/* Mobil Menü İkonu */}
        <button
          className="md:hidden flex items-center justify-center h-10 w-10 text-[#7f5539] focus:outline-none"
          onClick={toggleMenu}
        >
          <MenuIcon />
        </button>
      </div>

      {/* Mobil Menü Overlay ve Menü İçeriği */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Arka plan (şeffaf siyah) */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={closeMenu} // Menü dışına tıklanınca kapanır
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Yan menü */}
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-[#e6ccb2] shadow-lg p-4 flex flex-col gap-4 z-50"
              initial={{ x: "-100%" }} // Menünün başlangıç pozisyonu
              animate={{ x: 0 }} // Menünün görünür pozisyonu
              exit={{ x: "-100%" }} // Menü kapatılınca animasyonlu çıkış
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Menü Kapatma */}
              <button
                className="self-end text-[#7f5539] hover:text-[#9c6644] focus:outline-none"
                onClick={closeMenu}
              >
                X
              </button>

              {/* Menü İçerik (Linkler) */}
              {loggedIn ? (
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link href={`/category/${category.toLowerCase()}`} legacyBehavior>
                        <a
                          className="block text-[#7f5539] hover:bg-[#9c6644] hover:text-[#e6ccb2] p-2 rounded"
                          onClick={closeMenu} // Link tıklanınca menü kapanır
                        >
                          {category}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Please log in to see categories</p>
              )}

              {/* Login Butonu */}
              <Link href="/login" legacyBehavior>
                <a
                  className=" text-[#7f5539] hover:bg-[#9c6644] hover:text-[#e6ccb2] px-2 py-1 rounded flex items-center justify-center border border-[#9c6644] "
                  onClick={closeMenu} // Link tıklanınca menü kapanır
                >
                  {loggedIn ? (
                    <div onClick={handleLogout} className="flex w-20 items-center justify-center">
                      <span className="me-2">Logout</span> <RiLoginCircleLine />
                    </div>
                  ) : (
                    <div className="flex w-20 items-center justify-center">
                      <span className="me-2">Login</span> <RiLoginCircleFill />{" "}
                    </div>
                  )}
                </a>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
