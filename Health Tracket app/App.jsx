import React, { useState, useEffect } from "react"; 
import FoodSearch from "./FoodSearch";
import MealLog from "./MealLog";
import { getMeals, saveMeals } from "./Space";
import GoalTracker from "./GoalTracker";
import WeeklyChart from "./WeeklyChart";
import 'bootstrap/dist/css/bootstrap.min.css';
const today = new Date().toISOString().slice(0,10);

function App() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    setMeals(getMeals());
  }, []);
 
  const handleAddMeal = (meal) => {
    const updated = [...meals, meal];
    setMeals(updated);
    saveMeals(updated);
  };
  const handleDeleteMeal = (index) => {
    const updatedMeals = meals.filter((_, i) => i !== index);
    setMeals(updatedMeals);
    localStorage.setItem(`meals-${today}`, JSON.stringify(updated));  };
  const totalCalories = meals.reduce((sum, m) => sum + m.nf_calories, 0);
  const totalProtein = meals.reduce((sum, m) => sum + m.nf_protein, 0);
  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🥗 HealthMate – Nutrition Tracker</h1>
      <div className="mb-4">
      <FoodSearch onAddMeal={handleAddMeal} />
      </div>
      
      <GoalTracker
  totalCalories={totalCalories}
  totalProtein={totalProtein}
  calorieGoal={2000}
  proteinGoal={100}
/>
      <MealLog meals={meals} onDelete={handleDeleteMeal}/>
    

      <div>— chart should go below —</div>
<WeeklyChart />
<div>— chart should go above —</div>
    </div>
  );
}

export default App;
