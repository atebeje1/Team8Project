const apiKey = "AAPKd8b3d74fcd6d48c4a9d7ad7fdd2586d3uItUr-Jq29EZoumP4wUgXHzwHWOzP-nX44BOi-rGNtE1N57gh3l7nRhPI9flXWRO";

const basemapEnum = "ArcGIS:Navigation";

const map = L.map("map", {
  minZoom: 2
});

let currentLocationMarker;

// Add a marker for the user's current location
function onLocationFound(e) {
  currentLocationMarker = L.marker(e.latlng).addTo(map)
    .bindPopup("You are here.");

  var lat = e.latitude
  var long = e.longitude
  document.getElementById('output').innerHTML = lat;
}

function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);
map.locate({setView: true, maxZoom: 16});
map.setView([33.753224087238785, -84.3852604445813], 14);

L.esri.Vector.vectorBasemapLayer(basemapEnum, {
  apiKey: apiKey
}).addTo(map);

L.Control.PlacesSelect = L.Control.extend({
  onAdd: function (map) {

    const placeCategories = [
      ["", "Find:"],
      ["Gas Station", "Gas Station"]
    ];

    const select = L.DomUtil.create("select", "");
    select.setAttribute("id", "optionsSelect");
    select.setAttribute("style", "font-size: 16px;padding:4px 8px;");

    placeCategories.forEach((category) => {
      let option = L.DomUtil.create("option");
      option.value = category[0];
      option.innerHTML = category[1];
      select.appendChild(option);
    });

    return select;
  },

  onRemove: function (map) {
    // Nothing to do here
  }
});

L.control.placesSelect = function (opts) {
  return new L.Control.PlacesSelect(opts);
};

L.control.placesSelect({
  position: "topright"
}).addTo(map);

const layerGroup = L.layerGroup().addTo(map);

let currentRouteControl;

function showPlaces(category) {

  L.esri.Geocoding
    .geocode({
      apikey: apiKey
    })
    .category(category)
    .nearby(map.getCenter(), 10)
    .run(function (error, response) {
      if (error) {
        return;
      }

      layerGroup.clearLayers();

      response.results.forEach((searchResult) => {
        const destinationMarker = L.marker(searchResult.latlng)
          .addTo(layerGroup)
          .bindPopup(`<b>${searchResult.properties.PlaceName}</b></br>${searchResult.properties.Place_addr}`)
          .on('click', function (e) {
            if (currentRouteControl) {
              map.removeControl(currentRouteControl);
            }

            currentRouteControl = L.Routing.control({
              waypoints: [
                currentLocationMarker.getLatLng(),
                L.latLng(searchResult.latlng.lat, searchResult.latlng.lng)
              ],
              show: false,
              // Store the clicked coordinates in the currentRouteControl object
              
            }).addTo(map);
          })
      });

    });

}

const select = document.getElementById("optionsSelect");
select.addEventListener("change", () => {
  if (select.value !== "") {
    showPlaces(select.value);
  }
});