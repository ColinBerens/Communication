// Get the button element by its ID
const aboutMeButton = document.getElementById('aboutMeButton');
const seeMoreButton = document.getElementById('seemorebutton');
const lightModeButton = document.getElementById('LightMode');
const sendEmailButton = document.getElementById('SendEmail');
// Add a click event listener to the button
aboutMeButton.addEventListener('click', function() {
  // Redirect to work.html when the button is clicked
  window.location.href = 'aboutMe.html';
});
seeMoreButton.addEventListener('click', function() {
  window.location.href = 'work.html';
});
lightModeButton.addEventListener('click', function() {
  const rootStyles = getComputedStyle(document.documentElement);
  const blackColor = rootStyles.getPropertyValue('--black-color');
  const whiteColor = rootStyles.getPropertyValue('--white-color');
  
  // Swap the colors
  document.documentElement.style.setProperty('--black-color', whiteColor);
  document.documentElement.style.setProperty('--white-color', blackColor);
});
sendEmailButton.addEventListener('click', function(){

});
function loadNavbar() {
  fetch('navbar.html')
      .then(response => response.text())
      .then(data => {
          document.getElementById('navbar').innerHTML = data;
      });
    }