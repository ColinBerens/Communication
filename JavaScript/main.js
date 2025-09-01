document.addEventListener('DOMContentLoaded', initPage);

let imageArray = []; // Declare imageArray globally

function initPage() {
    loadNavbar();
    loadFooter();
    loadContactForm();
    loadOwnGames();
    GetAllImages();
    displayOutcomeMessage();
}

const aboutMeButton = document.getElementById('aboutMeButton');
const seeMoreButton = document.getElementById('seemorebutton');

if (aboutMeButton) {
  aboutMeButton.addEventListener('click', function() {
      window.location.href = 'aboutMe.html';
  });
}

if (seeMoreButton) {
  seeMoreButton.addEventListener('click', function() {
      window.location.href = 'work.html';
  });
}

function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        })
        .catch(error => console.error('Error loading navbar:', error));
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

function loadContactForm() {
    fetch('contactform.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('contactform').innerHTML = data;
        })
        .catch(error => console.error('Error loading contact form:', error));
}

function loadOwnGames() {
    fetch('owngames.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('owngames').innerHTML = data;
        })
        .catch(error => console.error('Error loading own games:', error));
}

function displayOutcomeMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const outcomeLabel = document.getElementById('outcome');
    if (outcomeLabel) {
        if (success === '1') {
            outcomeLabel.textContent = "Your message has been sent successfully!";
            outcomeLabel.style.color = "green";
        } else if (success === '0') {
            outcomeLabel.textContent = "There was an error sending your message. Please try again.";
            outcomeLabel.style.color = "red";
        }
    }
}

function GetAllImages(){
    let numberOfImages = 19;
    for (let i = 1; i <= numberOfImages; i++) {
        imageArray.push(`IMAGES/SolarPunkConcept/p${i}.png`);
        console.log(imageArray);
    }
}

function Change(number) {
    index += number;
    if(index >= 19)
    {
        index = 0
    }
    if(index <0)
    {
        index = 18
    }
    switchImage();
}

let index = 19;

function switchImage() {
    const imageElement = document.getElementById('solarpunkimage');
    if (imageElement) {
        imageElement.src = imageArray[index];
    }
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('show');
}