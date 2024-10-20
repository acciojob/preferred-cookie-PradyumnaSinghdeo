//your JS code here. If required.
// Function to set the font size and color from cookies if they exist
function applyPreferences() {
  const fontSize = getCookie("fontsize");
  const fontColor = getCookie("fontcolor");

  if (fontSize) {
    document.documentElement.style.setProperty('--fontsize', fontSize + 'px');
    document.getElementById('fontsize').value = fontSize;
  }

  if (fontColor) {
    document.documentElement.style.setProperty('--fontcolor', fontColor);
    document.getElementById('fontcolor').value = fontColor;
  }
}

// Function to save the font size and color to cookies
function savePreferences(event) {
  event.preventDefault(); // Prevent the form from submitting

  const fontSize = document.getElementById('fontsize').value;
  const fontColor = document.getElementById('fontcolor').value;

  // Save the preferences in cookies
  setCookie("fontsize", fontSize, 365); // Store for 1 year
  setCookie("fontcolor", fontColor, 365);

  // Apply the changes to the page immediately
  applyPreferences();
}

// Function to set a cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

// Function to get a cookie by name
function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Attach the savePreferences function to the form submit event
document.getElementById('customizationForm').addEventListener('submit', savePreferences);

// Apply preferences when the page loads
window.onload = applyPreferences;
