

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import userEvent from '@testing-library/user-event'

test('As a Chef, I want to store my recipes so that I can keep track of them.', () => {
  render(<App />);

  let recipeHeader = screen.getByText('My Recipes');
  expect(recipeHeader).toBeInTheDocument();

  let recipeList = screen.getByText('There are no recipes to list.');
  expect(recipeList).toBeInTheDocument();

  expect(recipeHeader.compareDocumentPosition(recipeList)).toBe(4);

});

test("contains an add recipe button", () => {
  render(<App />);

  let recipeHeader = screen.getByText('My Recipes');
  let button = screen.getByRole('button', {name: 'Add Recipe'});

  expect(button).toBeInTheDocument();
  expect(recipeHeader.compareDocumentPosition(button)).toBe(4);

});

test("contains an add recipe button that when clicked opens a form", async () => {
  // Render the landing page
  render(<App />);

  // Click the Add Recipe button
  const button = screen.getByRole('button', { name: /Add Recipe/i });
  userEvent.click(button);

  // Wait for the form fields to appear on the screen
  const nameInput = await screen.findByLabelText(/Recipe Name/i, {}, { timeout: 3000 });
  const instructionsInput = await screen.findByLabelText(/Recipe Instructions/i, {}, { timeout: 3000 });

  // Verify the form fields appear
  expect(nameInput).toBeInTheDocument();
  expect(instructionsInput).toBeInTheDocument();

  // Verify the Add Recipe button is no longer on the screen
  expect(screen.queryByRole('button', { name: /Add Recipe/i })).toBeNull();
});

test("shows new recipe after adding", async () => {
  // Render the landing page
  render(<App />);

  // Click the "Add Recipe" button to open the form
  const button = screen.getByRole('button', { name: 'Add Recipe' });
  userEvent.click(button);

  // Wait for the form fields to appear
  const recipeNameBox = await screen.findByRole('textbox', { name: /Recipe Name/i });
  const recipeInstructionBox = screen.getByLabelText(/Recipe Instructions/i);

  // Enter recipe details
  const recipeName = 'Tofu Scramble Tacos';
  const recipeInstructions = '1. heat a skillet on medium with a dollop of coconut oil\n2. warm flour tortillas';
  await userEvent.type(recipeNameBox, recipeName);
  await userEvent.type(recipeInstructionBox, recipeInstructions);

  // Click the submit button
  const submitButton = screen.getByRole('button', { name: /Submit/i });
  userEvent.click(submitButton);

  // Check that the recipe appears in the list
  const recipe = await screen.findByText(recipeName);
  expect(recipe).toBeInTheDocument();
});

test("displays multiple recipes below 'My Recipes' heading", async () => {
  render(<App />);

  // Recipe data to add
  const recipes = [
    { name: 'Tofu Scramble Tacos', instructions: 'Heat skillet and cook tofu with spices.' },
    { name: 'Vegan Pancakes', instructions: 'Mix flour, almond milk, and baking powder. Cook on skillet.' },
    { name: 'Spaghetti Marinara', instructions: 'Cook pasta, add marinara sauce, and stir.' },
  ];

  // Add each recipe using the form
  for (const recipe of recipes) {
    // Open the form by clicking "Add Recipe"
    const addButton = await screen.findByRole('button', { name: /Add Recipe/i });
    userEvent.click(addButton);

    // Fill out form fields
    const nameInput = await screen.findByRole('textbox', { name: /Recipe Name/i });
    const instructionsInput = screen.getByLabelText(/Recipe Instructions/i);

    await userEvent.type(nameInput, recipe.name);
    await userEvent.type(instructionsInput, recipe.instructions);

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    userEvent.click(submitButton);
  }

  // Verify all recipes appear in the list below the "My Recipes" heading
  expect(screen.getByRole('heading', { name: /My Recipes/i })).toBeInTheDocument();

  for (const recipe of recipes) {
    // Use a function matcher to check that each recipe's name appears in the document
    expect(
      await screen.findByText((content, element) => element?.textContent === recipe.name)
    ).toBeInTheDocument();

    expect(
      await screen.findByText((content, element) => element?.textContent === recipe.instructions)
    ).toBeInTheDocument();
  }
});