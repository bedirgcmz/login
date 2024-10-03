"use client";
import { useEffect, useState } from "react";
import { registeredUser } from "@/utils/users";
import { useUserContext } from "@/newcontext/AuthContext";
import { userContextType } from "@/utils/types";
import Swal from "sweetalert2";
import Link from "next/link";
import { FaFilter } from "react-icons/fa6";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const userContext = useUserContext();
  const { user } = userContext as userContextType;
  const [meals, setMeals] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isMoreAvailable, setIsMoreAvailable] = useState<boolean>(true);
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Kategoriye göre API'den verileri çekme
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params.category}`
        );
        const data = await response.json();
        setMeals(data.meals);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMeals();
  }, [params.category]);

  const handleSeeMore = () => {
    // "See More" butonuna tıklanınca görünür olan yemek sayısını artırma
    if (visibleCount < meals.length) {
      setVisibleCount(visibleCount + 4);
    } else {
      // Daha fazla yemek yoksa uyarı mesajı gösterme
      setIsMoreAvailable(false);
    }
  };

  const addMealToFavoriList = (pMealId: string) => {
    // registeredUser içindeki ilgili kullanıcıyı bul
    const userItem = registeredUser.find((item) => item.id === user?.id);

    // Eğer kullanıcı varsa ve favori listesi tanımlı ise
    if (userItem && userItem.favoriList) {
      if (!userItem.favoriList.includes(pMealId)) {
        userItem.favoriList.push(pMealId);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successful",
          showConfirmButton: false,
          timer: 800,
          width: "250px",
          customClass: {
            popup: "p-2 text-sm",
            icon: "text-xs",
            title: "text-sm",
          },
        });
      } else {
        Swal.fire("You already added this to your favorites list!");
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        {params.category.charAt(0).toUpperCase() + params.category.slice(1)} Category
      </h1>
      <p className="mb-8 text-center">
        You are viewing the {params.category.charAt(0).toUpperCase() + params.category.slice(1)}{" "}
        category.
      </p>
      {/* Arama çubuğu ve butonlar */}
      <div className="flex flex-col md:flex-row items-center justify-center mb-8 gap-4">
        <div className="w-full md:w-[400px] max-w-[400px] flex justify-center relative">
          <input
            type="text"
            placeholder="Search for a meal..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="px-4 pr-6 border w-full h-[41px] border-gray-300 rounded-l-lg outline-none"
          />
          <span
            onClick={() => setFilterText("")}
            className="absolute right-[58px] top-[7px] text-[#ccc] cursor-pointer"
          >
            x
          </span>
          <button className="px-4 py-2 h-[40px] bg-[#ddb892] hover:bg-[#b08968] text-white rounded-r-lg flex items-center justify-center">
            <FaFilter />
          </button>
        </div>
      </div>

      {/* Kartları içeren alan */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        {meals
          .filter((meal) => meal.strMeal?.toLowerCase().includes(filterText.toLowerCase()))
          .slice(0, visibleCount)
          .map((meal) => (
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
          ))}
      </div>

      {/* "See More" butonu ve uyarı mesajı */}
      <div className="mt-8 flex flex-col items-center">
        {isMoreAvailable ? (
          <button
            onClick={handleSeeMore}
            className="px-6 py-2 bg-[#ddb892] hover:bg-[#b08968] text-white rounded-lg transition-colors"
          >
            See More
          </button>
        ) : (
          <p className="text-red-500 mt-4">No more recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
