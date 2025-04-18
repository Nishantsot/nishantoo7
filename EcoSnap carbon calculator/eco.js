const form = document.getElementById("carbonForm");
const resultBox = document.getElementById("result");
const footprintEl = document.getElementById("footprint");
const tipEl = document.getElementById("tip");

const tips = [
  "Try biking or walking short distances instead of driving.",
  "Switch to LED bulbs to save electricity.",
  "Eat at least one vegetarian meal a day.",
  "Unplug electronics when not in use.",
  "Take shorter showers to reduce water and energy use."
];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const travel = parseFloat(document.getElementById("travel").value) || 0;
  const electricity = parseFloat(document.getElementById("electricity").value) || 0;
  const meat = parseFloat(document.getElementById("meat").value) || 0;

  // Simple emission factors (estimates)
  const travelCO2 = travel * 0.21;        // kg CO2 per km (car)
  const electricityCO2 = electricity * 0.5; // kg CO2 per kWh
  const meatCO2 = meat * 2.5;             // kg CO2 per meal

  const total = (travelCO2 + electricityCO2 + meatCO2).toFixed(2);
  footprintEl.textContent = total;
  let message = "";
  if (total < 5) {
    message = "Great job! 🌟 Your carbon footprint is low. Keep it up!";
  } else if (total >= 5 && total <= 15) {
    message = "Not bad! 👍 There's room to reduce a bit more.";
  } else {
    message = "Oops! 😬 Your footprint is on the higher side. Let's work on it!";
  }


  // Show random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  tipEl.textContent = ` YOUR RESULT:- ${message}.
   Tip:- ${randomTip}.`;

  resultBox.classList.remove("hidden");
});

