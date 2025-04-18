const locationDisplay = document.getElementById("location");
const alertsBox = document.getElementById("alerts-box");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(fetchWeatherData, showError);
  } else {
    locationDisplay.textContent = "Geolocation is not supported by your browser.";
  }
}

function fetchWeatherData(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  locationDisplay.textContent = `Latitude: ${lat.toFixed(2)}, Longitude: ${lon.toFixed(2)}`;

  
  const apiKey = "4e46fe92c2200fb46c227edb73298f62"; 
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
        const feels_likes =data.main.feels_like
      alertsBox.innerHTML = `
        <strong>Weather:</strong> ${weather}<br />
        <strong>Description:</strong> ${description}<br />
        <strong>Temperature:</strong> ${temp}°C <br/>

       <strong>feels_likes:</strong> ${feels_likes}°C

               

      `;
    })
    .catch(() => {
      alertsBox.textContent = "Error fetching weather data.";
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationDisplay.textContent = "Permission denied.";
      break;
    case error.POSITION_UNAVAILABLE:
      locationDisplay.textContent = "Location unavailable.";
      break;
    case error.TIMEOUT:
      locationDisplay.textContent = "Request timed out.";
      break;
    default:
      locationDisplay.textContent = "An unknown error occurred.";
      break;
  }
}
const checklists = {
    flood: [
      "Move valuables to upper floors",
      "Store clean drinking water",
      "Check weather updates regularly"
    ],
    earthquake: [
      "Secure heavy items",
      "Keep emergency kit ready",
      "Know safe spots at home"
    ],
    fire: [
      "Keep fire extinguisher",
      "Clear flammable materials",
      "Plan fire escape routes"
    ]
  };
  
  function loadChecklist() {
    const disaster = document.getElementById("disaster-select").value;
    const checklistEl = document.getElementById("checklist-items");
    checklistEl.innerHTML = "";
  
    checklists[disaster].forEach((item, index) => {
      const checked = localStorage.getItem(`${disaster}-${index}`) === "true";
      const li = document.createElement("li");
      li.innerHTML = `<input type="checkbox" id="chk-${index}" ${
        checked ? "checked" : ""
      } onchange="saveChecklist('${disaster}', ${index}, this.checked)"> ${item}`;
      checklistEl.appendChild(li);
    });
  }
  
  function saveChecklist(disaster, index, value) {
    localStorage.setItem(`${disaster}-${index}`, value);
  }
  
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    localStorage.setItem("darkMode", document.body.classList.contains("dark"));
  }
  
  window.onload = () => {
    // Dark mode on load
    const dark = localStorage.getItem("darkMode") === "true";
    if (dark) document.body.classList.add("dark");
  
    loadChecklist();
  };
  

