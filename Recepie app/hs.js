let recipes = [
    {
      title: "Pasta",
      ingredients: "Noodles, Tomato Sauce, Garlic",
      instructions: "Boil pasta. Make sauce. Mix together."
    },
    {
      title: "Grilled Cheese",
      ingredients: "Bread, Cheese, Butter",
      instructions: "Butter bread, add cheese, grill until golden."
    }
  ];
  
  const listDiv = document.getElementById("recipe-list");
  const detailDiv = document.getElementById("recipe-detail");
  const form = document.getElementById("recipe-form");
  
  function renderRecipes() {
    listDiv.innerHTML = "";
    recipes.forEach((recipe, index) => {
      const div = document.createElement("div");
      div.textContent = recipe.title;
      div.onclick = () => showDetails(index);
      listDiv.appendChild(div);
    });
  }
  
  function showDetails(index) {
    const recipe = recipes[index];
    detailDiv.innerHTML = `
      <h3>${recipe.title}</h3>
      <strong>Ingredients:</strong>
      <p>${recipe.ingredients}</p>
      <strong>Instructions:</strong>
      <p>${recipe.instructions}</p>
    `;
  }
  
  form.onsubmit = function(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
  
    recipes.push({ title, ingredients, instructions });
    renderRecipes();
    form.reset();
  };
  
  renderRecipes();
  