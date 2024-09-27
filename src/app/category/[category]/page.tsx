"use client";
import React, { useEffect, useState } from "react";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const [meals, setMeals] = useState<any[]>([]); // Yemek verilerini tutmak için state
  const [visibleCount, setVisibleCount] = useState<number>(6); // Başlangıçta görüntülenecek yemek sayısı
  const [isMoreAvailable, setIsMoreAvailable] = useState<boolean>(true); // Daha fazla ürün olup olmadığını kontrol etmek için

  console.log(params.category);

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
  }, [params.category]); // `params.category` değiştiğinde API tekrar çağrılacak

  const handleSeeMore = () => {
    // "See More" butonuna tıklanınca görünür olan yemek sayısını artırma
    if (visibleCount < meals.length) {
      setVisibleCount(visibleCount + 4);
    } else {
      // Daha fazla yemek yoksa uyarı mesajı gösterme
      setIsMoreAvailable(false);
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

      {/* Kartları içeren alan */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        {meals.slice(0, visibleCount).map((meal) => (
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
              <button className="text-[#b08968] hover:text-[#7f5539]">Recipe</button>
              <button className="text-green-500 hover:text-green-700">Save</button>
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
