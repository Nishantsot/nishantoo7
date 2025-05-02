import React from "react";

const MealLog = ({ meals, onDelete }) => {
  // Calculate the total calories and protein
  const totalCalories = meals.reduce((sum, item) => sum + item.nf_calories, 0);
  const totalProtein = meals.reduce((sum, item) => sum + item.nf_protein, 0);

  return (
    <div className="card p-3 shadow-sm"> 
      <h3 className="text-center mb-4">Today's Meal Log</h3>
      {meals.length === 0 ? (
        <p className="text-center">No meals logged for today. Start adding your meals!</p>
      ) : (
        meals.map((meal, idx) => (
          <div key={idx}  className="d-flex justify-content-between align-items-center mb-3">
            <strong>{meal.food_name}</strong>: {meal.nf_calories} cal, {meal.nf_protein}g protein
            {/* Delete button */}
            <button onClick={() => onDelete(idx)} style={{ marginLeft: "10px", color: "red" }}>
              ❌
            </button>
          </div>
        ))
      )}
      <hr />
      <div className="text-center">
      <p><strong>Total Calories:</strong> {totalCalories} cal</p>
      <p><strong>Total Protein:</strong> {totalProtein}g</p>
      </div>
    </div>
  );
};

export default MealLog;
