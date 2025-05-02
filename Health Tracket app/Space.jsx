export const getMeals = (dateKey) => {
  const all = JSON.parse(localStorage.getItem("meals")) || {};
  return all[dateKey] || [];
};

export const saveMeals = (dateKey, meals) => {
  const all = JSON.parse(localStorage.getItem("meals")) || {};
  all[dateKey] = meals;
  localStorage.setItem("meals", JSON.stringify(all));
};
export function getAllMeals() {
  return Object.entries(localStorage)
    .filter(([k]) => k.startsWith("meals-"))
    .reduce((acc, [k,v]) => {
      const date = k.slice("meals-".length);
      acc[date] = JSON.parse(v);
      return acc;
    }, {});
}