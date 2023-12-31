// var speedElement = document.getElementById("speed");
// var alertSound = document.getElementById("alertSound");

// if ("geolocation" in navigator) {
//   var options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0,
//   };

//   navigator.geolocation.watchPosition(
//     function (position) {
//       var speed = position.coords.speed || 0;
//       speedElement.textContent = speed.toFixed(2) + " m/s";

//       if (speed * 3.6 > 12) {
//         // Convert m/s to km/h
//         alertSound.play();
//       }
//     },
//     function (error) {
//       console.error("Error getting location: " + error.message);
//     },
//     options
//   );
// } else {
//   speedElement.textContent = "Geolocation is not supported in this browser.";
// }

var speedElement = document.getElementById("speed");
var speakButton = document.getElementById("speakButton");

// Check if the SpeechSynthesis API is available in the browser
if ("speechSynthesis" in window) {
  // Add an event listener to the button
  speakButton.addEventListener("click", function () {
    // Get the text to be read (the current speed)
    var textToSpeak = speedElement.textContent;

    // Create a new SpeechSynthesisUtterance
    var speech = new SpeechSynthesisUtterance();
    speech.text = textToSpeak;

    // Use the default speech synthesis voice
    speech.voice = speechSynthesis.getVoices()[0];

    // Start speaking
    speechSynthesis.speak(speech);
  });
} else {
  // If the SpeechSynthesis API is not available, display a message
  speedElement.textContent = "Text-to-speech is not supported in this browser.";
  speakButton.disabled = true;
}

if ("geolocation" in navigator) {
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  navigator.geolocation.watchPosition(
    function (position) {
      var speed = position.coords.speed || 0;
      speedElement.textContent = speed.toFixed(2) * 3.6 + " km/h";

      if (speed * 3.6 > 12) {
        // Convert m/s to km/h
        // Uncomment the next line if you want to automatically trigger speech
        speechSynthesis.speak(speech);
      }
    },
    function (error) {
      console.error("Error getting location: " + error.message);
    },
    options
  );
} else {
  speedElement.textContent = "Geolocation is not supported in this browser.";
  speakButton.disabled = true;
}
