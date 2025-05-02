import React, { useState } from "react";
import axios from "axios";
const APP_ID="a65b5177"
 const APP_KEY="2df05ffd50d6ca74fd6e87d2fe438e9d"


const FoodSearch = ({ onAddMeal }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
 
  const searchFood = async () => {
    const res = await axios.post(
      "https://trackapi.nutritionix.com/v2/natural/nutrients",
      { query },
      {
        headers: {
          "x-app-id":APP_ID,
          "x-app-key":APP_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    setResult(res.data.foods[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (result) {
      onAddMeal(result);
      setQuery("");
      setResult(null);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h4 className="mb-3">Search for a Food</h4>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter food item"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={searchFood}
          >
            Search
          </button>
        </div>
      </form>
      {result && (
        <div className="alert alert-info">
          <h5>{result.food_name}</h5>
          <p>{result.nf_calories} calories, {result.nf_protein}g protein</p>
          <button onClick={() => onAddMeal(result)}>Add to Log</button>
        </div>
      )}
    </div>
  );
};

export default FoodSearch;
