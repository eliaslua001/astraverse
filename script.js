let userInputName = '';
let userInputShipName = '';
let commanderName = '';

let lastPopupCloseTime = 0; // Timestamp of the last popup close
const popupReappearDelay = 30000; // Delay in milliseconds (30 seconds)

function startExploring() {
  document.getElementById('root').style.display = 'none'; // Hide the landing page
  document.getElementById('landing-content').style.display = 'none'; // Hide the landing content
  document.getElementById('canvas').style.display = 'block'; // Show starfield
  document.querySelector('.container').style.display = 'block'; // Show the celestial bodies
  document.querySelector('.astronaut').style.display = 'block'; // Show the astronaut
  document.querySelector('.spaceship').style.display = 'block'; // Show the spaceship
  document.querySelector('.message-log-button').style.display = 'block'; // Show the spaceship
  var spaceshipNameInput = document.getElementById('spaceshipName').value;
  var spaceshipName = spaceshipNameInput.trim(); // Store the user input spaceship name
  var userNameInput = document.getElementById('userName').value;
  function toSentenceCase(str) {
    return str.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
      return c.toUpperCase();
    });
  }
  var userName = toSentenceCase(userNameInput.trim()); // Convert to sentence case and store the user input name
  userInputName = userName; // Store the user input name
  userInputShipName = spaceshipName; // Store the user input name
  userDisplayName = userInputName ? userInputName : 'Reese';
  spaceshipData.name = userInputShipName ? userInputShipName : 'Odyssey';
  updateCloseButtonMCText();
  document.querySelector('.message-log-overlay').style.display = 'block';
  document.querySelector('.welco').style.display = 'block';
  displayWelcomeMessage();
}
const astronomicalUnit = 149597871; // 149,597,871 kilometers (1 AU)
const scaleRatio = 300; // Each unit represents 300 times the corresponding distance in reality

let debounceTimer;

// Define section headers and contents into array
const sectionHeaders = [
  "Explore at Your Pace",
  "Interactive Learning",
  "Swift Journey",
  "Mission Control Messages",
  "Astronomical Facts",
  "Travel Log",
  "Outer Planets Exploration",
  "Command Console Access"
];

const sectionContents = [
  ["Scroll slowly to take in the beauty of each celestial body in our to-scale solar system."],
  ["Click on any celestial body to discover interesting facts and details about it.",
    "Discover more by clicking on the left and right arrows in the fact boxes to navigate through different facts about each celestial body.",
    "Zoom in and out on the 3D model for a closer look if you so wish."],
  ["Opt for 'Fast Travel' when the option appears, allowing you to swiftly advance to the next celestial bodies. This prompt reappears every 30 seconds after being dismissed, should you choose to leap ahead."],
  ["Engage with your spacecraft at any moment for entertaining and insightful updates from Mission Control, enhancing your voyage."],
  ["Interact with the astronaut to learn random space facts that might surprise you."],
  ["Keep an eye on the distance meter to see how far you've traveled from the Sun, appreciating the vast distances of space."],
  ["Don't forget to explore the outer planets, they're further away but hold fascinating secrets!"],
  ["Click on the hub icon at the top right corner at any time to revisit the Command Console."]
];

// Get the parent ul element
const consoleListUl = document.getElementById('console-list-ul');

// Loop through the section headers and contents arrays
for (let i = 0; i < sectionHeaders.length; i++) {
  const header = sectionHeaders[i];
  const content = sectionContents[i];

  // Create li elements for each section
  const li = document.createElement('li');
  const strong = document.createElement('strong');
  strong.textContent = header;
  li.appendChild(strong);

  // Create ul element for the contents
  const ul = document.createElement('ul');
  for (const item of content) {
    const subLi = document.createElement('li');
    subLi.innerHTML = item;
    ul.appendChild(subLi);
  }

  // Append the ul element to the parent li
  li.appendChild(ul);

  // Append the parent li to the custom list ul
  consoleListUl.appendChild(li);
}

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
    'The Sun is a G2 V, yellow dwarf main-sequence star.',
    'The Sun is a star at the center of the Solar System.',
    'The Sun is about 100 times wider than Earth.',
    'It is composed of hot plasma interwoven with magnetic fields.',
    'The Sun\'s core can reach temperatures up to 15 million°C.',
    'The Sun was formed 4.6 billion years ago.',
    'In 5.6 billion years, our Sun will become a white dwarf.',
    'The Sun is a ball of hydrogen and helium, held in place by its own gravity.',
    'The part of the Sun that is commonly referred to as the "surface" is actually the photosphere, as the Sun doesn\'t have a solid surface!',
    'The photosphere is about 402 km thick.',
    'Sunspots are a key feature of the Sun, created when a portion of the Sun\'s magnetic field pokes out from within its interior.',
    'Approximately every 11 years, the Sun\'s geographic poles change their magnetic polarity.'
  ]
},
{
  id: 'mercury',
  src: 'assets/mercury.glb',
  poster: 'assets/mercury.png',
  alt: 'Mercury',
  color: 'gray',
  diameter: 4879, // 4,879 kilometres
  distance: 0.4, // AU Distance
  name: 'Mercury',
  facts: [
    'Mercury is named after the ancient Roman god of traveller, otherwise known as Hermes to the ancient Greeks.',
    'Mercury is the smallest planet in the Solar System and the closest to the Sun.',
    'It has a very thin atmosphere composed mainly of oxygen, sodium, hydrogen, helium, and potassium.',
    'Mercury\'s day temperature can go up as high as 430°C while at night can go as low as -180°C!',
    'Mercury is not the hottest planet despite being the closest to our Sun!',
    'Mercury is fastest planet, travelling at a speed of 47km/s!',
    'Mercury\'s rotation is slower then its orbit: One Mercurian solar day = 2 Mercurian years!',
    'Mercury\'s axis tilt is just 2 degrees, hence it does not experience seasons like the other planets does.',
    'Mercury is the second densest planet in our Solar System, it\'s mettalic core is about 85% of the planet\'s radius!',
    'Mercury\'s exosphere consists mostly of oxygen, sodium, hydrogen, helium, and potassium.'
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
    'Venus is named after the ancient Roman goddess of love who in turn is known as Aphrodite to the ancient Greeks.',
    'Venus is the only planet that is named after a goddess.',
    'Venus is often called the "Morning Star" or the "Evening Star".',
    'It has a thick atmosphere mainly composed of carbon dioxide with clouds of sulfuric acid.',
    'Venus is similar in structure and size to Earth.',
    'Venus spins slowly in the opposite direction from most planets.',
    'Venus holds the title for the hottest planet in our Solar System. Its thick atmosphere creates a potent greenhouse effect, trapping heat and leading to surface temperatures capable of melting lead.',
    'The atmospheric pressure at the height of 50km fromt the surface is similar to that of Earth.',
    'Venus\' day temperatuire can go as high as 475°C.',
    'One Venusian year is about 1.92 Venusian solar days: One Venusian day takes 243 Earth days while one Venusian year takes 225 Earth days. ',
    'Venus\' tilt axis is at a mere 3 degrees, hence it too will not experience any significant seasons',
    'Though similar to Earth, Venus is an inferno where life as we know it could not exist on Venus like it does on Earth.',
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
    'Earth is the only planet that is not named after a god in ancient Greek/Roman mythology. Its name originates from Old English and Germanic roots.',
    'Earth is the third planet from the Sun and the only astronomical object known to harbor life.',
    'It has one natural satellite, the Moon, which plays a significant role in stabilising its axial tilt.',
    'Earth is the only planet in our Solar System to have one moon.',
    'Earth is made up of four layers, starting from the inner core follwoed by the outer core, mantle, and lastly the crust.',
    'Earth\'s axis is tilted at 23.4° which causes our yearly seasons.',
    'Earth\'s global oceans covers nearly 70% of the planet\'s surface and it contains 97% of Earth\'s water.',
    'Most of Earth\'s volcanoes and mountain ranges are underwater.',
    'Our surface contains 78% nitrogen, 21% oxygen, and 1% other gases such as argon, carbon dioxide, and neon.',
    'Our atmosphere is one of the most important feature as it shields us from the radiation and solar storms from Sun. It also protects us from meteoroids.',
    'Earth\'s polarity can change every 400,000 years or so, swapping the geological north and south point.',
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
    'It is tidally locked to Earth, meaning the same side always faces Earth.',
    'The Moon is possibly formed after a collision with Earth billions of years ago.',
    'The Moon is 384,400km away from Earth and its slowly moving further away from us each year.',
    'The Moon rotates at the same rate as it revolves around Earth, which ias why the same side is always facing us.',
    'The Moon\'s is made up of a core, mantle, and a crust.',
    'The Moon used to have active volcanoes but are now dormat for millions of years.',
    'The lighter areas on The Moon\'s surface are known as highlands and the darker features are called maria (Latin for seas).',
    'The brightest lunar crater is called Tycho Crater, with a diameter of 85km and having a depth of 4,700m. ',
    'The gravity on The Moon is one-sixth that of Earth.',
    'The surface temperature during the day is 127°C while at night, the temperature plumemt to -173°C. ',
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
    'Mars is named after the ancient Roman god of war and its known as Ares to the ancient Greeks.',
    'Mars is known as the "Red Planet" due to its reddish appearance.',
    'It has the tallest volcano and the deepest canyon in the Solar System, Olympus Mons and Valles Marineris respectively.',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
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
    'Its iconic Great Red Spot is a massive storm that has been raging for at least 400 years.',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
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
    'It has the second-largest moon in the Solar System, Titan, which has a dense atmosphere and surface lakes of liquid methane.',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
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
    'It was the first planet discovered with a telescope, by William Herschel in 1781.',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
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
    'It was the first planet to be discovered through mathematical calculations, rather than direct observation.',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]
}
];

const spaceshipData = {
  name: '',
  messages: [
    "Remember to buckle up! Safety first as we embark on our journey.",
    "Keep an eye on the distance meter to track our progress.",
    "Click on the celestial bodies to learn fascinating facts about them.",
    '',
    '',
    '',
    '',
    '',
    '',
  ]
};

function generateSpaceship() {
  const spaceship = document.getElementById('spaceship');

  spaceship.addEventListener('click', function () {
    showRandomSpaceshipMessage(); // Display random message
  });
}

function displayWelcomeMessage() {
  // Array of commander names
  const commanderNames = [
    "Sirius",
    "Elara",
    "Orion",
    "Celeste",
    "Atlas",
    "Luna",
    "Altair",
    "Andromeda"
  ];

  // Select the commander name based on the index
  commanderName = commanderNames[Math.floor(Math.random() * commanderNames.length)];

  // Change background color based on the generated name
  const welcoWrapper = document.querySelector('.welco-wrapper');
  switch (commanderName) {
    case 'Sirius':
    case 'Orion':
    case 'Atlas':
    case 'Altair':
      welcoWrapper.style.backgroundColor = '#8fbfe7bf';
      break;
    case 'Elara':
    case 'Celeste':
    case 'Luna':
    case 'Andromeda':
      welcoWrapper.style.backgroundColor = '#e78f8fbf';
      break;
    default:
      welcoWrapper.style.backgroundColor = '#eeeeee';
  }

  // Construct the welcome message
  const welcomeMessage = `Greetings, ${userDisplayName}! As <strong><em>Commander</em></strong> <strong>${commanderName} Firstblood</strong>, I'm thrilled to welcome you on our cosmic expedition! From the fiery depths of The Sun to the icy reaches of distant planets, we'll journey together and uncover the marvels of the universe! Let's embark on this stellar adventure, shall we? &#127776;&#128640;`;

  // Display the welcome message
  const welcomeMessageElement = document.querySelector('.welco .welcomeMessage');
  welcomeMessageElement.innerHTML = welcomeMessage;

  // Attach event listener to the close icon
  const closeIconWM = document.querySelector('.close-iconWM');
  closeIconWM.addEventListener('click', function () {
    // Hide the welcome message
    document.querySelector('.welco').style.display = 'none';
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

  const missionControl = `<span class="material-icons">satellite_alt</span>&nbsp&nbspHouston, ${spaceshipData.name}.&nbsp&nbsp<span class="material-icons">satellite_alt</span>`;
  missionControlElement.innerHTML = missionControl;
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
    'There are more stars in the universe than grains of sand on all the beaches on Earth.',
    'A light-year is the distance light travels in one year, which equals about 9.5 trillion kilometers.',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
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
    document.querySelector('.container').style.overflow = 'hidden';
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
  }

  factContainer.appendChild(modelViewer); // Set the text content of factWrapper to the fact
  factWrapper.textContent = facts[index];
  currentFactIndex = index;
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

const celestialBodyPositions = [];

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

  celestialBodyPositions.push(distance); // Store the celestial body position

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

// Function to auto-scroll to the next celestial body
function scrollToNextBody() {
  document.querySelector('.command-message').style.display = 'none';
  const viewportHeight = window.innerHeight;
  const currentPosition = window.scrollY;
  let nextBodyIndex = celestialBodyPositions.findIndex(pos => pos > currentPosition);
  if (nextBodyIndex === -1) {
    // User is at the end, scroll to the last body
    nextBodyIndex = celestialBodyPositions.length - 1;
  }
  // Find the corresponding planet element
  const nextBodyElement = document.getElementById(celestialBodies[nextBodyIndex].id);
  // Calculate the position to center the body vertically
  const bodyTopPosition = nextBodyElement.getBoundingClientRect().top + window.scrollY;
  const bodyHeight = nextBodyElement.offsetHeight;
  const scrollToPosition = bodyTopPosition - (viewportHeight / 2) + (bodyHeight / 2);
  // Scroll to the centered position of the celestial body
  window.scrollTo({
    top: scrollToPosition,
    behavior: 'smooth'
  });
}

function closeFastTravel() {
  document.querySelector('.command-message').style.display = 'none';
  lastPopupCloseTime = new Date().getTime(); // Record the close time
}

function checkVisibilityAndUpdatePopup() {
  // Initially hide the popup until we know a body has gone out of view
  document.querySelector('.command-message').style.display = 'none';

  const currentTime = new Date().getTime();
  // Check if the popup was closed recently and if the delay has not yet passed
  if (currentTime - lastPopupCloseTime < popupReappearDelay) {
    return; // Exit the function early if the delay hasn't passed
  }

  let bodyVisible = false;
  for (let i = 0; i < celestialBodies.length; i++) {
    const body = celestialBodies[i];
    const bodyElement = document.getElementById(body.id);
    const rect = bodyElement.getBoundingClientRect();

    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      // The body is currently visible
      bodyVisible = true;
      currentBodyIndex = i; // Update the currentBodyIndex to the last visible body
      break;
    }
  }

  // If the currently viewed body is not visible, show the popup for the next body
  if (!bodyVisible && currentBodyIndex < celestialBodies.length - 1) {
    const nextBody = celestialBodies[currentBodyIndex + 1];
    showCommandMessage(nextBody);
  }
}

function showCommandMessage(nextBody) {
  const systemMessage = [
    "Everything's looking good in the system.",
    "No anomalies detected.",
    "Navigation systems online and operational.",
    "Smooth sailing ahead.",
    "Enjoy the view of the cosmos!"
  ][Math.floor(Math.random() * 5)];

  const comModMsg = `<span class="material-icons">cell_tower</span>&nbsp;&nbsp;${spaceshipData.name}, ${userDisplayName}&nbsp;&nbsp;<span class="material-icons">cell_tower</span>`;
  const destinationMessage = `Travelling towards ${nextBody.name} at ${(nextBody.distance * astronomicalUnit).toLocaleString()} km!`;

  document.querySelector('.command-message').style.display = 'block';
  document.querySelector('.commandMod').innerHTML = comModMsg;
  document.querySelector('.systemComMod').textContent = systemMessage;
  document.querySelector('.messageComMod').textContent = destinationMessage;
}

window.addEventListener('scroll', function () {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(function () {
    checkVisibilityAndUpdatePopup();

    const scrollPosition = window.scrollY;
    const markerOffset = markerLine.getBoundingClientRect().top + window.scrollY - sunPosition;
    let distanceFromSunKm = (markerOffset > 0 ? markerOffset : 0) * scaleRatio + sunDistanceKm;

    if (markerOffset > celestialBodies[0].diameter / scaleRatio) {
      document.getElementById('distance').textContent = distanceFromSunKm.toLocaleString();
      document.querySelector('.distance-meter').style.display = 'block';
      document.querySelector('.marker-line').style.display = 'block';
    } else {
      document.querySelector('.distance-meter').style.display = 'none';
      document.querySelector('.marker-line').style.display = 'none';
    }
  }, 100); // Unified timeout function for both visibility check and distance update
})