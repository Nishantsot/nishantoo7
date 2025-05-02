import React from "react";
import { ProgressBar } from 'react-bootstrap';
const GoalTracker = ({ totalCalories, totalProtein, calorieGoal, proteinGoal }) => {
  const caloriePercent = Math.min((totalCalories / calorieGoal) * 100, 100);
  const proteinPercent = Math.min((totalProtein / proteinGoal) * 100, 100);

  return (
    <div className="card p-3 mb-4 shadow-sm">
      <h4>🎯 Daily Goals</h4>
      <p><strong>Calories:</strong> {totalCalories} / {calorieGoal} kcal</p>
      <ProgressBar now={caloriePercent} label={`${Math.round(caloriePercent)}%`} className="mb-3" />

      <p><strong>Protein:</strong> {totalProtein} / {proteinGoal} g</p>
      <ProgressBar now={proteinPercent} label={`${Math.round(proteinPercent)}%`} variant="success" />
    </div>
  );
};

export default GoalTracker;
