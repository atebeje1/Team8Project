//Google Maps API
// main.js
function initMap() {
    // Set up the map
    var mapContainer = document.getElementById('map');
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 33.7490, lng: -84.3880},
      zoom: 13
    });
    
  
    // Set up the info window
    var infoWindow = new google.maps.InfoWindow;
    //customer location
    var customerLocation = new google.maps.LatLng(33.7573171, -84.3825055);
  
    // Add a marker for the customer
    var customerMarker = new google.maps.Marker({
      position: customerLocation,
      map: map,
      title: 'Customer Location'
    });
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var driverPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
  
        infoWindow.setPosition(driverPos);
        infoWindow.setContent('You are here.');
        infoWindow.open(map);
  
        // Add a marker for the driver
        var driverMarker = new google.maps.Marker({
          position: driverPos,
          map: map,
          title: 'Driver Location'
        });
  
        // Add a line between the driver and customer
        var line = new google.maps.Polyline({
          path: [driverPos, customerLocation],
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });
        line.setMap(map);

        var distance = google.maps.geometry.spherical.computeDistanceBetween(driverPos, customerLocation);
        distance = distance / 1609.344; // Convert from meters to miles
  
       var distanceText = document.getElementById('distance');
        distanceText.innerHTML = distance.toFixed(2) + ' miles';
          
       var pay = document.getElementById('pay');
       pay.innerHTML = distance.toFixed(2) * 1 + ' $';
       Math.round(pay);
  
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }
  }
  window.onload = function() {
    initMap();
  };
  
  
