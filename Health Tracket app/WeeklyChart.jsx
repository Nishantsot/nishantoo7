import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { getAllMeals } from "./Space";

export default function WeeklyChart() {
  // 1. Pull all stored meals by date
  const testData = [
    { date: "2025-05-01", calories: 1800, protein: 70 },
    { date: "2025-05-02", calories: 2000, protein: 80 },
  ];

  const mealsByDate = getAllMeals();

  // 2. Build an array of { date, calories, protein } sorted by date,
  //    then take the last 7 days
  const raw = Object.entries(mealsByDate)
    .map(([date, meals]) => ({
      date,
      calories: meals.reduce((sum, m) => sum + m.nf_calories, 0),
      protein:  meals.reduce((sum, m) => sum + m.nf_protein,  0),
    }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7);
    console.log("getAllMeals() →", mealsByDate);
  // 3. Log the array so you can inspect it in DevTools
  console.log("WeeklyChart data:", raw);

  if (raw.length === 0) {
    return (
      <div className="alert alert-secondary text-center mt-4">
        Log your first meal to see the weekly chart!
      </div>
    );
  }

  return (
    <div className="card p-3 shadow-sm mt-4">
      <h4 className="text-center mb-3">📊 Weekly Intake</h4>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={testData} margin={{ bottom: 60 }}>
          <XAxis
            dataKey="date"
            type="category"
            interval={0}
            angle={-45}
            textAnchor="end"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="calories" name="Calories" fill="#007bff" />
          <Bar dataKey="protein"  name="Protein"  fill="#28a745" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}