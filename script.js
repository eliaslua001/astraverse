let userInputName = '';

function startExploring() {
  document.getElementById('root').style.display = 'none'; // Hide the landing page
  document.getElementById('landing-content').style.display = 'none'; // Hide the landing content
  document.querySelector('.container').style.display = 'block'; // Show the celestial bodies
  document.querySelector('.astronaut').style.display = 'block'; // Show the astronaut
  document.querySelector('.spaceship').style.display = 'block'; // Show the spaceship
  document.querySelector('.message-log-button').style.display = 'block'; // Show the spaceship
  var spaceshipName = document.getElementById('spaceshipName').value;
  userInputName = spaceshipName.trim(); // Store the user input name
  spaceshipData.name = userInputName ? userInputName : 'Odyssey';
  updateCloseButtonMCText();
  document.querySelector('.message-log-overlay').style.display = 'block';
}
const astronomicalUnit = 149597871; // 149,597,871 kilometers (1 AU)
const scaleRatio = 300; // Each unit represents 300 times the corresponding distance in reality

let debounceTimer;

const celestialBodies = [{
  id: 'sun',
  src: 'assets/sun.glb',
  poster: 'assets/sun.png',
  alt: 'Sun',
  color: 'yellow',
  diameter: 1392700, // 1.3927 million kilometres
  distance: 0, // Starting point for this model
  name: 'Sun',
  age: '4.5 billion',
  facts: [
    'The Sun is a star at the center of the Solar System.',
    'It is composed of hot plasma interwoven with magnetic fields.',
  ]
},
{
  id: 'mercury',
  src: 'assets/mercury.glb',
  poster: 'assets/mercury.png',
  alt: 'Mercury',
  color: 'gray',
  diameter: 4879.4, // 4,879.4 kilometres
  distance: 0.4, // AU Distance
  name: 'Mercury',
  facts: [
    'Mercury is the smallest planet in the Solar System and the closest to the Sun.',
    'It has a very thin atmosphere composed mainly of oxygen, sodium, hydrogen, helium, and potassium.'
  ]
},
{
  id: 'venus',
  src: 'assets/venus.glb',
  poster: 'assets/venus.png',
  alt: 'Venus',
  color: 'orange',
  diameter: 12104, // 12,104 kilometers
  distance: 0.72, // AU Distance
  name: 'Venus',
  facts: [
    'Venus is often called the "Morning Star" or the "Evening Star".',
    'It has a thick atmosphere mainly composed of carbon dioxide with clouds of sulfuric acid.'
  ]
},
{
  id: 'earth',
  src: 'assets/earth.glb',
  poster: 'assets/earth.png',
  alt: 'Earth',
  color: 'blue',
  diameter: 12742, // 12,742 kilometres
  distance: 1, // AU Distance
  name: 'Earth',
  facts: [
    'Earth is the third planet from the Sun and the only astronomical object known to harbor life.',
    'It has one natural satellite, the Moon, which plays a significant role in stabilizing its axial tilt.'
  ]
},
{
  id: 'moon',
  src: 'assets/moon.glb',
  poster: 'assets/moon.png',
  alt: 'Moon',
  color: 'gray',
  diameter: 3475, // 3,475 kilometers
  distance: 1.00257, // 1 AU + 384,400 kilometres (0.00257 AU)
  name: 'Moon',
  facts: [
    'The Moon is Earth\'s only natural satellite.',
    'It is tidally locked to Earth, meaning the same side always faces Earth.'
  ]
},
{
  id: 'mars',
  src: 'assets/mars.glb',
  poster: 'assets/mars.png',
  alt: 'Mars',
  color: 'red',
  diameter: 6779, // 6,779 kilometers
  distance: 1.5, // AU Distance
  name: 'Mars',
  facts: [
    'Mars is known as the "Red Planet" due to its reddish appearance.',
    'It has the tallest volcano and the deepest canyon in the Solar System, Olympus Mons and Valles Marineris respectively.'
  ]
},
{
  id: 'jupiter',
  src: 'assets/jupiter.glb',
  poster: 'assets/jupiter.png',
  alt: 'Jupiter',
  color: 'tan',
  diameter: 142800, // 142,800 kilometres
  distance: 5.20, // AU Distance
  name: 'Jupiter',
  facts: [
    'Jupiter is the largest planet in the Solar System and has more than 75 moons.',
    'Its iconic Great Red Spot is a massive storm that has been raging for at least 400 years.'
  ]
},
{
  id: 'saturn',
  src: 'assets/saturn.glb',
  poster: 'assets/saturn.png',
  alt: 'Saturn',
  color: 'gold',
  width: 402536, // 120,536 kilometres, 402,536 kilometres including rings
  diameter: 120536,
  distance: 9.5, // AU Distance
  name: 'Saturn',
  facts: [
    'Saturn is known for its prominent ring system, made up of ice particles and dust.',
    'It has the second-largest moon in the Solar System, Titan, which has a dense atmosphere and surface lakes of liquid methane.'
  ]
},
{
  id: 'uranus',
  src: 'assets/uranus.glb',
  poster: 'assets/uranus.png',
  alt: 'Uranus',
  color: 'lightblue',
  diameter: 50724, // 50,724 kilometres
  distance: 19.8, // AU Distance
  name: 'Uranus',
  facts: [
    'Uranus is unique among the planets because it rotates on its side.',
    'It was the first planet discovered with a telescope, by William Herschel in 1781.'
  ]
},
{
  id: 'neptune',
  src: 'assets/neptune.glb',
  poster: 'assets/neptune.png',
  alt: 'Neptune',
  color: 'blue',
  diameter: 49528, // 49,528 kilometers
  distance: 30, // AU Distance
  name: 'Neptune',
  facts: [
    'Neptune is the farthest planet from the Sun and is often referred to as an "Ice Giant".',
    'It was the first planet to be discovered through mathematical calculations, rather than direct observation.'
  ]
}
];

const spaceshipData = {
  name: '',
  messages: [
    "Remember to buckle up! Safety first as we embark on our journey.",
    "Keep an eye on the distance meter to track our progress.",
    "Hover over celestial bodies to learn fascinating facts about them.",
    // Add more messages here
  ]
};

function generateSpaceship() {
  const spaceship = document.getElementById('spaceship');

  spaceship.addEventListener('click', function () {
    showRandomSpaceshipMessage(); // Display random message
  });
}

function showRandomSpaceshipMessage() {
  const spaceshipMessages = spaceshipData.messages;

  const randomSpaceshipMessage = spaceshipMessages[Math.floor(Math.random() * spaceshipMessages.length)];
  const spaceshipMessageContainer = document.querySelector('.spaceship-message');
  const missionControlElement = spaceshipMessageContainer.querySelector('.missionControl');
  const messageContentElement = spaceshipMessageContainer.querySelector('.messageContent');
  const userInput = document.getElementById('spaceshipName').value.trim();
  spaceshipData.name = userInput ? userInput : 'Odyssey';

  const missionControl = `Houston, ${spaceshipData.name}.`;
  missionControlElement.textContent = missionControl;
  missionControlElement.classList.add('missionControl'); // Add the class for styling
  messageContentElement.textContent = randomSpaceshipMessage;
  spaceshipMessageContainer.style.display = 'block';

  updateCloseButtonMCText();
}

const closeButtonMC = document.querySelector('.closeButtonMC');
updateCloseButtonMCText(); // Call the function to set the initial text

function updateCloseButtonMCText() {
  const defaultName = 'Odyssey'; // Default name if the user didn't input anything
  const buttonText = spaceshipData.name ? `${spaceshipData.name}, Houston. Roger.` : `${defaultName}, Houston. Roger.`;
  closeButtonMC.textContent = buttonText;
}

closeButtonMC.addEventListener('click', function () {
  const spaceshipMessageContainer = document.querySelector('.spaceship-message');
  spaceshipMessageContainer.style.display = 'none';
});

const astronautData = {
  src: 'assets/astronaut.glb',
  poster: 'assets/astronaut.png',
  alt: 'Astronaut',
  name: 'Astronaut',
  facts: [
    'Space is completely silent.',
    'The Sun contains 99.86% of the mass in the Solar System.',
    'The largest volcano in the Solar System is on Mars: Olympus Mons.',
    'A day on Venus is longer than a year on Venus.',
    'There are more stars in the universe than grains of sand on all the beaches on Earth.'
    // Add more facts as needed
  ]
};

function generateAstronaut() {
  const astronaut = document.getElementById('astronaut');

  astronaut.addEventListener('click', function () {
    showRandomAstronautFact(); // Display random fact
  });
}

function showRandomAstronautFact() {
  const astronautFacts = astronautData.facts;

  const randomAstronautFact = astronautFacts[Math.floor(Math.random() * astronautFacts.length)];
  const astronautFactContainer = document.querySelector('.astronaut-fact');
  const astronautFact = astronautFactContainer.querySelector('.fact');
  astronautFact.textContent = randomAstronautFact;
  astronautFactContainer.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
  generateAstronaut(); // Generate astronaut
  generateSpaceship(); // Generate spaceship
  const input = document.getElementById('spaceshipName'); // Retrieve the input element
  input.setAttribute('size', input.getAttribute('placeholder').length);
  const messageLogButton = document.getElementById('message-log-button');
  const messageLogOverlay = document.getElementById('message-log-overlay');

  // Show message log overlay when user clicks start exploring
  function showOverlay() {
    messageLogOverlay.style.display = 'block';
  }

  // Hide message log overlay when user clicks close button
  function hideOverlay() {
    messageLogOverlay.style.display = 'none';
  }

  // Add event listener to message log button
  messageLogButton.addEventListener('click', showOverlay);

  // Add event listener to close button
  const closeButton = document.querySelector('.close-messageLog');
  closeButton.addEventListener('click', hideOverlay);
});

const factContainer = document.querySelector('.fact-container');
const factWrapper = factContainer.querySelector('.fact-wrapper');
factWrapper.style.backgroundColor = 'rgba(120, 120, 120, 0.7)'; // Set the background color dynamically
const nameElement = factContainer.querySelector('.name');
const diameterElement = factContainer.querySelector('.diameter');
const distanceElement = factContainer.querySelector('.distance');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', function () {
  factContainer.style.display = 'none';
});

// JavaScript to close the fact box when the cross icon is clicked
const closeIcon = document.querySelector('.close-icon');
const astronautFactContainer = document.querySelector('.astronaut-fact');

closeIcon.addEventListener('click', function () {
  astronautFactContainer.style.display = 'none';
});


let currentBodyIndex = 0;
let currentFactIndex = 0;
let currentRotation = 0;

function showFact(index) {
  const body = celestialBodies[currentBodyIndex];
  const facts = body.facts;
  const factContainer = document.querySelector('.fact-container');
  const factWrapper = factContainer.querySelector('.fact-wrapper');
  nameElement.textContent = body.name;

  diameterElement.textContent = `Diameter: ${parseNumeriqueSpace(body.diameter)} km`;
  // Check if the current body is the Sun, then hide the distance
  if (body.id !== 'sun') {
    distanceElement.textContent = `Distance from Sun: ${parseNumeriqueSpace(Math.ceil(body.distance * astronomicalUnit))} km`;
  } else {
    distanceElement.textContent = ''; // Hide the distance for the Sun
  }
  // Remove existing model-viewer if any
  const existingModelViewer = document.querySelector('.model-viewer');
  if (existingModelViewer) {
    existingModelViewer.remove();
  }
  // Create and append model-viewer for the current body
  const modelViewer = document.createElement('model-viewer');
  currentRotation = modelViewer.currentRotation;
  modelViewer.className = 'model-viewer';
  modelViewer.setAttribute('src', body.src);
  modelViewer.setAttribute('alt', body.alt);
  modelViewer.setAttribute('auto-rotate', '');
  modelViewer.setAttribute('camera-controls', '');
  modelViewer.style.height = '300px';
  modelViewer.style.width = '100%';
  modelViewer.style.marginTop = '10px';

  if (body.id === 'saturn') {
    modelViewer.setAttribute('camera-orbit', '0deg 75deg 3098m');

    factContainer.appendChild(modelViewer); // Set the text content of factWrapper to the fact
    factWrapper.textContent = facts[index];
    currentFactIndex = index;
  }
}
closeButton.addEventListener('click', function () {
  factContainer.style.display = 'none';
  // Remove existing model-viewer if any when closing the fact container
  const existingModelViewer = document.querySelector('.model-viewer');
  if (existingModelViewer) {
    existingModelViewer.remove();
  }
});

leftArrow.addEventListener('click', function () {
  currentFactIndex = (currentFactIndex - 1 + celestialBodies[currentBodyIndex].facts.length) % celestialBodies[currentBodyIndex].facts.length;
  showFact(currentFactIndex); // Show the updated fact
  const modelViewer = document.querySelector('.model-viewer'); // Set the stored rotation angle back to the model
  modelViewer.currentRotation = currentRotation;
});

rightArrow.addEventListener('click', function () {
  currentFactIndex = (currentFactIndex + 1) % celestialBodies[currentBodyIndex].facts.length;
  showFact(currentFactIndex); // Show the updated fact
  const modelViewer = document.querySelector('.model-viewer'); // Set the stored rotation angle back to the model
  modelViewer.currentRotation = currentRotation;
});

celestialBodies.forEach(body => {
  const modelViewer = document.createElement('model-viewer');
  modelViewer.id = body.id;
  modelViewer.className = 'celestial-body';
  modelViewer.dataset.name = body.name;
  modelViewer.setAttribute('poster', body.poster); // Set the poster attribute to the URL of the poster image
  modelViewer.setAttribute('auto-rotate', ''); // Add auto-rotate attribute if desired
  modelViewer.setAttribute('camera-controls', ''); // Add camera controls attribute if desired

  if (body.id === 'saturn') {
    // Calculate size and shape for Saturn
    const size = body.width / scaleRatio
    modelViewer.style.width = body.width / scaleRatio + 'px'; // Set the desired width for the model
    modelViewer.style.height = body.diameter / scaleRatio + 'px';
    modelViewer.style.left = 'calc(50% - ' + (size / 2) + 'px)'; // Adjust the left position to center the body
  } else {
    // Calculate size and shape for other celestial bodies (circles)
    const size = body.diameter / scaleRatio
    modelViewer.style.width = size + 'px'; // Set the desired width for the model
    modelViewer.style.height = size + 'px'; // Set the desired height for the model
    modelViewer.style.left = 'calc(50% - ' + (size / 2) + 'px)'; // Adjust the left position to center the body
  }

  // Calculate distance based on scale ratio
  const distance = (body.distance * astronomicalUnit) / scaleRatio;
  modelViewer.style.top = distance + 'px'; // Set the distance from the top
  document.querySelector('.container').appendChild(modelViewer);

  // Create and append text element to display the name of the celestial body
  const nameElement = document.createElement('p');
  nameElement.className = 'name';
  nameElement.textContent = body.name;
  modelViewer.appendChild(nameElement);

  document.querySelector('.container').appendChild(modelViewer);

  modelViewer.addEventListener('click', function () {
    currentBodyIndex = celestialBodies.findIndex(item => item.id === body.id); // Set current body index
    showFact(0); // Show the first fact when clicked
    factContainer.style.display = 'block'; // Show the fact container
  });
});

function parseNumeriqueSpace(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const markerLine = document.querySelector('.marker-line');
const sunPosition = celestialBodies[0].distance * astronomicalUnit / scaleRatio;
const sunDistanceKm = celestialBodies[0].distance * astronomicalUnit;

const lastBody = celestialBodies[celestialBodies.length - 1];
const lastBodyDistance = (lastBody.distance * astronomicalUnit) / scaleRatio;
const lastBodyDiameter = lastBody.diameter / scaleRatio;
const bufferHeight = lastBodyDistance + lastBodyDiameter + 1000; // Adjust the buffer height as needed

// Set the container height to include the buffer
document.querySelector('.container').style.height = bufferHeight + 'px';

factContainer.addEventListener('click', function (event) {
  // Prevent click events from propagating outside the container
  event.stopPropagation();
});

document.addEventListener('click', function (event) {
  if (!event.target.closest('.celestial-body') && event.target !== factContainer) {
    factContainer.style.display = 'none';
  }
});

window.addEventListener('scroll', function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(function () {
    const scrollPosition = window.scrollY;
    const markerOffset = markerLine.getBoundingClientRect().top + window.scrollY - sunPosition;
    let distanceFromSunKm = (markerOffset > 0 ? markerOffset : 0) * scaleRatio + sunDistanceKm;

    if (markerOffset > celestialBodies[0].diameter / scaleRatio) {
      document.getElementById('distance').textContent = distanceFromSunKm.toLocaleString();
      document.querySelector('.distance-meter').style.display = 'block';
      document.querySelector('.marker-line').style.display = 'block'; // Show the marker line
    } else {
      document.querySelector('.distance-meter').style.display = 'none';
      document.querySelector('.marker-line').style.display = 'none'; // Hide the marker line
    }
  }, 50); // Adjust the debounce delay as needed
});