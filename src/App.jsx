import React, { useState } from 'react';

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipeName, setRecipeName] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');

  const handleAddRecipeClick = () => {
    setShowForm(true);
  };

  const handleRecipeNameChange = (e) => {
    setRecipeName(e.target.value);
  };

  const handleRecipeInstructionsChange = (e) => {
    setRecipeInstructions(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (recipeName && recipeInstructions) {
      setRecipes([...recipes, { name: recipeName, instructions: recipeInstructions }]);
      setShowForm(false);
      setRecipeName('');
      setRecipeInstructions('');
    }
  };

  return (
    <div>
      <h1>My Recipes</h1>
      {recipes.length === 0 ? (
        <p>There are no recipes to list.</p>
      ) : (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              <h2>{recipe.name}</h2>
              <p>{recipe.instructions}</p>
            </li>
          ))}
        </ul>
      )}

      {!showForm && (
        <button onClick={handleAddRecipeClick}>Add Recipe</button>
      )}

      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="recipeName">Recipe Name</label>
          <input
            id="recipeName"
            name="recipeName"
            type="text"
            value={recipeName}
            onChange={handleRecipeNameChange}
          />

          <label htmlFor="recipeInstructions">Recipe Instructions</label>
          <textarea
            id="recipeInstructions"
            name="recipeInstructions"
            value={recipeInstructions}
            onChange={handleRecipeInstructionsChange}
          ></textarea>

          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default App;
