let recipes = [];
let favorites = [];

async function addRecipe() {
  let name = document.getElementById("recipeName").value;
  let ingredients = document.getElementById("ingredients").value;
  let calories = document.getElementById("calories").value;

  if (name && ingredients && calories) {
    let image = await fetchImageFromAPI(name);

    let recipe = { name, ingredients, calories, image };
    recipes.push(recipe);
    displayRecipes();
  } else {
    alert("Please fill all fields!");
  }
}

async function fetchImageFromAPI(name) {
  try {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    let data = await response.json();
    if (data.meals && data.meals.length > 0) {
      return data.meals[0].strMealThumb;
    } else {
      return "https://via.placeholder.com/100";
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    return "https://via.placeholder.com/100";
  }
}

function displayRecipes() {
  let list = document.getElementById("recipeList");
  list.innerHTML = "";
  recipes.forEach((r, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <img src="${r.image}" alt="${r.name}" width="100" style="border-radius:10px; margin-right:10px;">
      <b>${r.name}</b> - ${r.ingredients} - ${r.calories} cal
      <button onclick="addToFavorites(${index})">⭐ Fav</button>
      <button onclick="deleteRecipe(${index})">🗑 Delete</button>`;
    list.appendChild(li);
  });
}

function addToFavorites(index) {
  favorites.push(recipes[index]);
  displayFavorites();
}

function displayFavorites() {
  let list = document.getElementById("favoriteList");
  list.innerHTML = "";
  favorites.forEach((r, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <img src="${r.image}" alt="${r.name}" width="80" style="border-radius:10px; margin-right:10px;">
      <b>${r.name}</b> - ${r.calories} cal 
      <button onclick="removeFavorite(${index})">❌ Remove</button>`;
    list.appendChild(li);
  });
}

function deleteRecipe(index) {
  recipes.splice(index, 1);
  displayRecipes();
}

function removeFavorite(index) {
  favorites.splice(index, 1);
  displayFavorites();
}