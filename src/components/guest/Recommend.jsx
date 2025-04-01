import React, { useEffect, useState } from "react";
import Card from "../../utils/Card";
import axios from "axios";
import useIngredientStore from "../../stores/ingredient-store";
import { Link } from "react-router";
import useAuthStore from "../../stores/auth-store";

function Recommend() {
  const ingredients = useIngredientStore((state) => state.ingredients);
  const actionSetIngredient = useIngredientStore(
    (state) => state.actionSetIngredient
  );
  const token = useAuthStore((state) => state.token);

  const getRecommendRecipe = async () => {
    try {
      const recipeData = await axios.get(
        "http://localhost:8000/api/recipes/recommend"
      );
      // console.log('recipe data',recipeData);
      const recipes = recipeData.data.recipes;
      // console.log("recipe", recipes);
      actionSetIngredient(recipes);
      // console.log("recommendRecipe",recommendRecipe);
    } catch (error) {
      console.log("fetch data error", error);
    }
  };

  useEffect(() => {
    getRecommendRecipe();
  }, []);

  console.log("ingredients", ingredients);

  return (
    <div className="flex flex-1 flex-wrap gap-10 p-10 pt-25 ml-82 ">
      {ingredients.map((el) => {
        return (
          <Link
            to={token ? `/user/recipe-data/${el.id}` : `/recipe-data/${el.id}`}
          >
            <Card
              key={el.id}
              name={el.name}
              description={el.description}
              foodImage={el.foodImage}
              category={el.category.name}
              firstname={el.user.firstname}
              lastname={el.user.lastname}
              profileImage={el.user.profileImage}
              likes={el.likes}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default Recommend;
