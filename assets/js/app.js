var speedElement = document.getElementById("speed");
var alertSound = document.getElementById("alertSound");

if ("geolocation" in navigator) {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  navigator.geolocation.watchPosition(
    function (position) {
      var speed = position.coords.speed || 0;
      speedElement.textContent = speed.toFixed(2) + " m/s";

      if (speed * 3.6 > 12) {
        // Convert m/s to km/h
        alertSound.play();
      }
    },
    function (error) {
      console.error("Error getting location: " + error.message);
    },
    options
  );
} else {
  speedElement.textContent = "Geolocation is not supported in this browser.";
}
