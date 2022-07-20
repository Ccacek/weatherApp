const fetchData = async (searchTerm) => {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather?",
    {
      params: {
        q: searchTerm,
        units: "imperial",
        appid: "403eb29505298a54cecf2cf8e3c9737c",
      },
    }
  );

  weatherResults(response.data);
};

const weatherResults = (data) => {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  console.log(name, icon, description, temp, humidity, speed);
  document.querySelector(".city").innerText = "Weather in " + name;
  document.querySelector(".icon").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".description").innerText = description;
  document.querySelector(".temperature").innerText = temp + " °F";
  document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
  document.querySelector(".wind").innerText = "Wind speed: " + speed + " mp/h";
};
//searchCity function is reaching into the DOM and calling FetchData() on the value of the search bar.
const searchCity = () => {
  fetchData(document.querySelector(".search-bar").value);
};

//eventListeners for click and enter button down below
document.querySelector(".search-button").addEventListener("click", function () {
  searchCity();
});

document.querySelector("input").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchCity();
  }
});
