// Grab key elements from the DOM
const form = document.getElementById('gift-form');
const occasionSelect = document.getElementById('occasion');
const ageSelect = document.getElementById('age');
const resultsSection = document.getElementById('gift-results');
const savedSection = document.getElementById('saved-section');
const savedList = document.getElementById('saved-gifts');
const clearBtn = document.getElementById('clear-saved');
const toggleBtn = document.getElementById('toggle-theme');

let allGiftIdeas = []; // Holds all gifts fetched from the server
let savedGifts = [];   // Stores user-saved gift ideas

// Fetch gift ideas from the live Render server
fetch("https://phase-1-projects-2bfn.onrender.com/gifts")
  .then(res => res.json())
  .then(data => {
    allGiftIdeas = data;

    // Get all unique occasions from the data and populate the dropdown
    const uniqueOccasions = [...new Set(allGiftIdeas.map(item => item.occasion))];
    uniqueOccasions.forEach(occasion => {
      const option = document.createElement('option');
      option.value = occasion;
      option.textContent = capitalize(occasion);
      occasionSelect.appendChild(option);
    });

    // When the user selects an occasion, update the age group dropdown
    occasionSelect.addEventListener('change', () => {
      const selectedOccasion = occasionSelect.value;

      // Filter gift ideas to match the selected occasion
      const ageOptions = allGiftIdeas
        .filter(item => item.occasion === selectedOccasion)
        .map(item => item.age);

      const uniqueAges = [...new Set(ageOptions)];

      // Clear current options and repopulate with relevant age groups
      ageSelect.innerHTML = '<option value="">-- Select Age Group --</option>';
      uniqueAges.forEach(age => {
        const option = document.createElement('option');
        option.value = age;
        option.textContent = capitalize(age);
        ageSelect.appendChild(option);
      });
    });
  })
  .catch(err => {
    console.error("Error loading gift ideas:", err);
    resultsSection.innerHTML = `<p>Failed to load gift ideas. Please check your server.</p>`;
  });

// Handle form submission to filter and display matching gift ideas
form.addEventListener('submit', e => {
  e.preventDefault();
  const occasion = occasionSelect.value;
  const age = ageSelect.value;
  resultsSection.innerHTML = '';

  // Ensure both dropdowns have a value selected
  if (!occasion || !age) {
    resultsSection.innerHTML = '<p>Please select both occasion and age group.</p>';
    return;
  }

  // Filter gift ideas that match both occasion and age group
  const matches = allGiftIdeas.filter(
    item => item.occasion === occasion && item.age === age
  );

  // If no matches, show a message
  if (matches.length === 0) {
    resultsSection.innerHTML = '<p>No gift ideas found.</p>';
    return;
  }

  // Display each matching gift idea as a card
  matches.forEach(giftItem => {
    const card = document.createElement('div');
    card.className = 'gift-card';
    card.innerHTML = `
      <h3>${giftItem.idea}</h3>
      <button class="save-btn"> Save</button>
    `;

    // When "Save" button is clicked, add gift to saved list if not already saved
    card.querySelector('.save-btn').addEventListener('click', () => {
      if (!savedGifts.includes(giftItem.idea)) {
        savedGifts.push(giftItem.idea);
        renderSavedGifts();
      }
    });

    resultsSection.appendChild(card);
  });

  // Clear form selections after submitting
  form.reset();
});

// Render the list of saved gifts
function renderSavedGifts() {
  savedList.innerHTML = '';

  // Hide saved section if there are no saved gifts
  if (savedGifts.length === 0) {
    savedSection.style.display = 'none';
    return;
  }

  // Show each saved gift as a list item
  savedGifts.forEach(gift => {
    const li = document.createElement('li');
    li.textContent = ` ${gift}`;
    savedList.appendChild(li);
  });

  // Make sure the saved section is visible
  savedSection.style.display = 'block';
}

// Clear all saved gifts when the clear button is clicked
clearBtn.addEventListener('click', () => {
  savedGifts = [];
  renderSavedGifts();
});

// Helper function to capitalize the first letter of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Toggle dark mode when the theme button is clicked
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
