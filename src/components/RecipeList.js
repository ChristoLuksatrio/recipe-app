import React from 'react';

const RecipeList = ({recipes}) => {
  return (
      recipes.map((data) => (
          <div>
            <h1>{data.recipe.label}</h1>
            <img src={data.recipe.image} alt={data.recipe.label} />
            <ol>
            {data.recipe.ingredients.map((ingredient) => (
              <li>{ingredient.text}</li>
            ))}
            </ol>
          </div>
      ))
  )
}

export default RecipeList;