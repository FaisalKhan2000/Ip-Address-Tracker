const input = document.getElementById("input");

const ipaddress = document.getElementById("ip");
const loc = document.getElementById("loc");
const timezone = document.getElementById("timezone");
const isp = document.getElementById("isp");

const btn = document.getElementById("btn");

let latitude;
let longitude;

function API() {
  const inputValue = input.value;
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_wGo8dDHMrBNkikD9Em1atAeS1uHMN&ipAddress=${inputValue}`;
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("API Issues");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      ipaddress.textContent = data.ip;
      loc.textContent = data.location.country;
      timezone.textContent = data.location.timezone;
      isp.textContent = data.isp;
      latitude = data.location.lat;
      longitude = data.location.lng;

      let mapOptions = {
        center: [latitude, longitude],
        zoom: 20,
      };

      // Creating a map object
      let map = new L.map("map", mapOptions);

      // Creating a Layer object
      let layer = new L.TileLayer(
        "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      );

      // Adding layer to the map
      map.addLayer(layer);

      // Add a location marker
      L.marker([latitude, longitude]).addTo(map);
    })
    .catch((error) => {
      console.error(error);
    });
}

btn.addEventListener("click", API);
