// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { registeredUser } from "@/utils/users";
import { useUserContext } from "@/context/AuthContext";
import { userContextType } from "@/utils/types";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa"; // React icons'dan search icon'u ekleniyor
import Link from "next/link";

export default function Home() {
  const userContext = useUserContext();
  const { loggedIn, setLoggedIn, user, setUser } = userContext as userContextType;

  const [meals, setMeals] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [randomMeals, setRandomMeals] = useState<any[]>([]);
  const alphabetArray = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "z",
    "p",
  ];

  // Sayfa yüklendiğinde random bir harf ile API'ye istek at
  useEffect(() => {
    const randomLetter = alphabetArray[Math.floor(Math.random() * alphabetArray.length)];
    fetchMealsByLetter(randomLetter);
  }, []);

  // İlk harf ile yemekleri fetch et
  const fetchMealsByLetter = async (letter: string) => {
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
      const data = await res.json();
      setMeals(data.meals ? data.meals.slice(0, 10) : []);
    } catch (error) {
      console.error("Error fetching meals by letter:", error);
    }
  };

  // Arama yapma fonksiyonu
  const searchMeals = async () => {
    if (!searchTerm) return;
    try {
      const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await res.json();
      setMeals(data.meals ? data.meals.slice(0, 10) : []);
      console.log(meals);
    } catch (error) {
      console.error("Error searching meals:", error);
    }
  };

  // Rastgele yemekleri getir
  const fetchRandomMeals = async () => {
    const randomLetter = alphabetArray[Math.floor(Math.random() * alphabetArray.length)];
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${randomLetter}`
      );
      const data = await res.json();
      setMeals(data.meals ? data.meals.slice(0, 10) : []);
    } catch (error) {
      console.error("Error searching meals:", error);
    }
  };

  const addMealToFavoriList = (pMealId: string) => {
    if (!loggedIn) {
      Swal.fire("Please log in for this feature.!");
      console.log(user);
    } else {
      const userItem = registeredUser.find((item) => item.id === user?.id);

      // Eğer kullanıcı varsa ve favori listesi tanımlı ise
      if (userItem && userItem.favoriList) {
        // favoriList içinde pMealId yoksa, ekle
        if (!userItem.favoriList.includes(pMealId)) {
          userItem.favoriList.push(pMealId);
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
        } else {
          Swal.fire("You already added this to your favorites list!");
        }
      }
    }
  };

  return (
    <div className="w-full px-8 py-6">
      <h1 className="text-center text-2xl mb-8">Enjoy every moment of cooking!</h1>
      {/* Arama çubuğu ve butonlar */}
      <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-4">
        <div className="w-full md:w-auto flex justify-center ">
          <input
            type="text"
            placeholder="Search for a meal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py- border h-[41px] border-gray-300 rounded-l-lg outline-none"
          />
          <button
            onClick={searchMeals}
            className="px-4 py-2 h-[40px] bg-[#ddb892] hover:bg-[#b08968] text-white rounded-r-lg flex items-center justify-center"
          >
            <FaSearch />
          </button>
        </div>
        <button
          onClick={fetchRandomMeals}
          className="ml-4 px-4 py-2 bg-[#ddb892] hover:bg-[#b08968] text-white rounded-lg"
        >
          Random Meal
        </button>
      </div>

      {/* Default liste */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        {meals.length ? (
          meals.map((meal) => (
            <div
              key={meal.idMeal}
              className="w-full md:w-[300px] h-[340px] flex flex-col p-4 border-[#e6ccb2] border-2 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                {meal.strMeal.length > 40 ? meal.strMeal.slice(0, 40) + "..." : meal.strMeal}
              </h3>

              {/* Kartın altındaki butonlar */}
              <div className="flex justify-between items-center mt-auto">
                <Link
                  href={`/recipe/${meal.idMeal}`}
                  className="text-[#b08968] hover:text-[#7f5539]"
                >
                  Recipe
                </Link>
                <button
                  onClick={() => addMealToFavoriList(meal.idMeal)}
                  className="text-green-500 hover:text-green-700"
                >
                  Save
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Sorry, we couldn't find any results for this search. Please try something else.</p>
        )}
      </div>

      {/* Oturum açma bildirisi */}
      {!loggedIn && (
        <div className="mt-8 text-center text-[#7f5539]">
          <p>For more options, please sign in and search by categories.</p>
        </div>
      )}
    </div>
  );
}
