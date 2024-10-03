"use client";
import { SetStateAction, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import MenuIcon from "@mui/icons-material/Menu";
import { AiFillHome } from "react-icons/ai";
import { RiLoginCircleFill, RiLoginCircleLine } from "react-icons/ri";
import { useUserContext } from "@/newcontext/AuthContext";
import { userContextType } from "@/utils/types";
import ProfileIcon from "../ProfileIcon";
import { usePathname } from "next/navigation";
import Header from "../Header";
// import "@/styles/global.css";

// type Category = {
//   name: string;
//   positionValue: string;
// };

// const categories: Category[] = [
//   {
//     name: "Seafood",
//     positionValue: "left-0",
//   },
//   {
//     name: "Vegetarian",
//     positionValue: "left-[110px]",
//   },
//   {
//     name: "Chicken",
//     positionValue: "left-[220px]",
//   },
//   {
//     name: "Dessert",
//     positionValue: "left-[330px]",
//   },
//   {
//     name: "Beef",
//     positionValue: "left-[440px]",
//   },
// ];

const Menu = () => {
  const userContext = useUserContext();
  const { loggedIn, setLoggedIn, user, setUser } = userContext as userContextType;
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Menü toggle işlevi
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Menü kapatma işlevi (menü dışına tıklama ve link tıklama)
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  const pathname = usePathname();
  const [leftVal, setLeftVal] = useState("hidden");
  const relativeValue = (pValue: SetStateAction<string>) => {
    setLeftVal(pValue);
    closeMenu();
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Kategoriye göre API'den verileri çekme
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (pathname === "/profile" || pathname === "/favorite") {
      setLeftVal("hidden");
    }
  }, [pathname]);

  return (
    <div className="relative">
      {/* Ana menü çubuğu */}
      <div className="flex items-center justify-between mb-[-40px] h-10 px-4 bg-[#e6ccb2] border-b border-gray-300">
        <Link
          onClick={() => relativeValue("hidden")}
          href="/"
          className={`items-center flex justify-center text-2xl h-10 text-[#ede0d4] hover:bg-[#9c6644] p-2 rounded-full ${
            pathname === "/" ? "active-mobile" : ""
          }`}
        >
          <AiFillHome />
        </Link>
        <div className="hidden md:flex justify-end z-10">
          <Link href="/login" legacyBehavior>
            <a className="flex items-center justify-center h-8 px-2 text-[#ede0d4] border border-[#ede0d4] rounded hover:bg-[#9c6644] hover:text-[#e6ccb2]">
              {loggedIn ? (
                <div onClick={handleLogout} className="flex w-18 items-center justify-center">
                  <span className="me-2">Logout</span> <RiLoginCircleLine />
                </div>
              ) : (
                <div className="flex w-20 items-center justify-center">
                  <span className="me-2">Login</span> <RiLoginCircleFill />{" "}
                </div>
              )}
            </a>
          </Link>
          {loggedIn ? <ProfileIcon setMenuOpen={setMenuOpen} /> : ""}
        </div>
        {/* Mobil Menü İkonu */}
        <button
          className="md:hidden z-30 flex items-center justify-center h-10 w-10 text-[#7f5539] focus:outline-none"
          onClick={toggleMenu}
        >
          <MenuIcon />
        </button>
      </div>
      <Header />
      {/* Kategori menu elemanlari */}
      <div className="flex items-center justify-center min-h-10 p-4 bg-[#e6ccb2] border-b border-gray-300">
        {loggedIn ? (
          <ul className="hidden md:flex justify-center flex-wrap gap-2 list-none p-0 m-0 ">
            {categories.map((category) => (
              <li key={category.strCategory} className="relative">
                <Link href={`/category/${category.strCategory.toLowerCase()}`} legacyBehavior>
                  <a
                    className={`flex items-center justify-center h-10 w-[110px] rounded-lg shadow-lg relative transition duration-200 ease-in-out text-[#7f5539] hover:text-[#e6ccb2] custom-hover ${
                      pathname === `/category/${category.strCategory.toLowerCase()}` ? "active" : ""
                    }`}
                  >
                    {category.strCategory}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>Please log in to see categories!</p>
        )}
      </div>

      {/* Mobil Menü Overlay ve Menü İçeriği */}
      <AnimatePresence>
        {menuOpen && (
          <div>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={closeMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Yan menü */}
            <motion.div
              className="fixed top-0 left-0 h-full w-64 bg-[#e6ccb2] overflow-y-scroll shadow-lg p-4 pb-24 flex flex-col gap-4 z-50"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Menü Kapatma */}
              <button
                className="self-end text-[#7f5539] z-30 hover:text-[#9c6644] focus:outline-none"
                onClick={closeMenu}
              >
                X
              </button>

              {/* Menü İçerik (Linkler) */}
              {loggedIn ? (
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  {categories.map((category) => (
                    <li key={category.strCategory}>
                      <Link href={`/category/${category.strCategory.toLowerCase()}`} legacyBehavior>
                        <a
                          className={`block text-[#7f5539] hover:bg-[#9c6644] hover:text-[#e6ccb2] p-2 rounded ${
                            pathname === `/category/${category.strCategory.toLowerCase()}`
                              ? "active-mobile"
                              : ""
                          }`}
                          onClick={() => setMenuOpen(false)}
                        >
                          {category.strCategory}
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
                  onClick={closeMenu}
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
              {loggedIn ? <ProfileIcon setMenuOpen={setMenuOpen} /> : ""}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Menu;
