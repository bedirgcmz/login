"use client";
import { useEffect, useState } from "react";
import { registeredUser } from "@/utils/users";
import { useUserContext } from "@/context/authcontext";
import { userContextType } from "@/utils/types";
import Swal from "sweetalert2";

const FavoritesPage = () => {
  const userContext = useUserContext();
  const { loggedIn, setLoggedIn, user, setUser } = userContext as userContextType;
  const [meals, setMeals] = useState<any[]>([]); // Yemek verilerini tutmak için state
  const [visibleCount, setVisibleCount] = useState<number>(6); // Başlangıçta görüntülenecek yemek sayısı
  const [isMoreAvailable, setIsMoreAvailable] = useState<boolean>(true); // Daha fazla ürün olup olmadığını kontrol etmek için

  // Fetch meals from API based on user's favorite list
  const fetchMeals = async () => {
    if (!user?.favoriList || user.favoriList.length === 0) return;

    const fetchedMeals: any[] = []; // Yeni meal verilerini tutacak geçici dizi
    const mealIds = new Set(meals.map((meal) => meal.idMeal)); // Mevcut meal ID'lerini tutan Set

    // Favori listedeki her ID için API'den veri çekme
    for (const mealId of user.favoriList) {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        );
        const data = await response.json();

        // Eğer meal daha önce eklenmemişse diziyi güncelle
        if (data.meals && data.meals.length > 0 && !mealIds.has(mealId)) {
          fetchedMeals.push(data.meals[0]); // Tek bir meal objesi olduğu için [0] kullanıyoruz
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    // State'i bir defada güncelle
    setMeals(fetchedMeals);
    console.log(meals);
    console.log(fetchedMeals);
  };

  // useEffect, component ilk render olduğunda çalışır
  useEffect(() => {
    fetchMeals();
  }, []);

  // Favori listeden meal kaldırma fonksiyonu
  const removeMealFromFavoriList = (pMealId: string) => {
    const userItem = registeredUser.find((item) => item.id === user?.id);

    if (userItem && userItem.favoriList) {
      userItem.favoriList = userItem.favoriList.filter((mealId) => mealId !== pMealId);

      // Kullanıcı context'ini güncelle
      setUser({
        ...user,
        favoriList: userItem.favoriList,
        name: userItem.name,
        id: userItem.id,
        password: userItem.password,
        image: userItem.image,
      });
      // setUser((prevUser: any) => ({ ...prevUser!, favoriList: userItem.favoriList, name }));

      // Meals state'inden öğeyi kaldırma
      setMeals((prevMeals) => prevMeals.filter((meal) => meal.idMeal !== pMealId));

      // Başarılı mesajı gösterme
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
    }
  };

  // "See More" butonuna tıklanınca görünür olan yemek sayısını artırma
  const handleSeeMore = () => {
    if (visibleCount < meals.length) {
      setVisibleCount(visibleCount + 4);
    } else {
      setIsMoreAvailable(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Your Favorites List</h1>

      {/* Kartları içeren alan */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        {meals &&
          meals.slice(0, visibleCount).map((meal) => (
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
                <button
                  onClick={() => removeMealFromFavoriList(meal.idMeal)}
                  className="text-[#ff8fab] hover:text-red-700"
                >
                  Remove
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

export default FavoritesPage;
