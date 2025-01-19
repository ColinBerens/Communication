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
function displayOutcomeMessage() {
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get('success');
  const outcomeLabel = document.getElementById('outcome');

  if (success === '1') {
      outcomeLabel.textContent = "Your message has been sent successfully!";
      outcomeLabel.style.color = "green";
  } else if (success === '0') {
      outcomeLabel.textContent = "There was an error sending your message. Please try again.";
      outcomeLabel.style.color = "red";
  }
  }