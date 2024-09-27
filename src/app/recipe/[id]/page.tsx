"use client";
import { useEffect, useState } from "react";

const RecipePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Renkler için önceki tasarımdan aldığınız renk paletini Tailwind ile uygulayacağız
  const customColors = {
    border: "border-[#e6ccb2]",
    hoverShadow: "hover:shadow-2xl",
    textPrimary: "text-[#b08968]",
    textSecondary: "text-[#7f5539]",
    buttonBg: "bg-[#ddb892]",
    buttonHoverBg: "hover:bg-[#b08968]",
  };

  useEffect(() => {
    if (id) {
      fetchMealById(id);
    }
  }, [id]);

  const fetchMealById = async (mealId: string) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );
      const data = await response.json();
      setMeal(data.meals[0]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meal:", error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 lg:p-12 max-w-5xl mx-auto">
      {/* Yemek Başlığı */}
      <h1 className={`text-4xl font-bold mb-6 ${customColors.textPrimary} text-center`}>
        {meal?.strMeal}
      </h1>

      {/* Yemek Resmi */}
      <div className="flex justify-center mb-8">
        <img
          src={meal?.strMealThumb}
          alt={meal?.strMeal}
          className="w-full max-w-xl rounded-lg shadow-lg"
        />
      </div>

      {/* Yemek Detayları */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* İçindekiler */}
        <div className="p-2 shadow-md">
          <h2 className={`text-2xl font-semibold mb-4 ${customColors.textSecondary}`}>
            Ingredients
          </h2>
          <ul className="list-disc list-inside space-y-2">
            {Object.keys(meal)
              .filter((key) => key.startsWith("strIngredient") && meal[key])
              .map((key) => (
                <li key={key} className="text-lg">
                  {meal[key]} - {meal[`strMeasure${key.slice(13)}`]}
                </li>
              ))}
          </ul>
        </div>

        {/* Tarif */}
        <div className="p-2 shadow-md">
          <h2 className={`text-2xl font-semibold mb-4 ${customColors.textSecondary}`}>
            Instructions
          </h2>
          <p className="text-lg leading-7">{meal?.strInstructions}</p>
        </div>
      </div>

      {/* YouTube Linki */}
      {meal?.strYoutube && (
        <div className="mt-8">
          <h2 className={`text-2xl font-semibold mb-4 ${customColors.textSecondary}`}>
            Watch on YouTube
          </h2>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-lg underline ${customColors.textPrimary} hover:${customColors.textSecondary}`}
          >
            {meal.strYoutube}
          </a>
        </div>
      )}

      {/* Buttonlar */}
      <div className="mt-12 flex justify-center">
        <button
          className={`px-6 py-3 rounded-lg shadow-md ${customColors.buttonBg} text-white ${customColors.buttonHoverBg} transition-all duration-300`}
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default RecipePage;
