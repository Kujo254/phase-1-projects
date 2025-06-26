const form = document.getElementById('gift-form');
const occasionSelect = document.getElementById('occasion');
const ageSelect = document.getElementById('age');
const resultsSection = document.getElementById('gift-results');
const savedSection = document.getElementById('saved-section');
const savedList = document.getElementById('saved-gifts');
const clearBtn = document.getElementById('clear-saved');

let allGiftIdeas = [];
let savedGifts = [];

// Fetch data and build unique dropdown options
fetch("http://localhost:3000/gifts")
  .then(res => res.json())
  .then(data => {
    allGiftIdeas = data;
    console.log("Gift ideas loaded:", allGiftIdeas);

    // Populate occasions
    const uniqueOccasions = [...new Set(allGiftIdeas.map(item => item.occasion))];
    uniqueOccasions.forEach(occasion => {
      const option = document.createElement('option');
      option.value = occasion;
      option.textContent = capitalize(occasion);
      occasionSelect.appendChild(option);
    });

    // On occasion change, populate age groups
    occasionSelect.addEventListener('change', () => {
      const selectedOccasion = occasionSelect.value;
      const filtered = allGiftIdeas.filter(item => item.occasion === selectedOccasion);
      const uniqueAges = [...new Set(filtered.map(item => item.age))];

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

form.addEventListener('submit', e => {
  e.preventDefault();
  const occasion = occasionSelect.value;
  const age = ageSelect.value;
  resultsSection.innerHTML = '';

  if (!occasion || !age) {
    resultsSection.innerHTML = '<p>Please select both occasion and age group.</p>';
    return;
  }

  const matches = allGiftIdeas.filter(
    item => item.occasion === occasion && item.age === age
  );

  if (matches.length === 0) {
    resultsSection.innerHTML = '<p>No gift ideas found.</p>';
    return;
  }

  matches.forEach(giftItem => {
    const card = document.createElement('div');
    card.className = 'gift-card';
    card.innerHTML = `
      <h3>${giftItem.idea}</h3>
      <button class="save-btn">❤️ Save</button>
    `;
    card.querySelector('.save-btn').addEventListener('click', () => {
      if (!savedGifts.includes(giftItem.idea)) {
        savedGifts.push(giftItem.idea);
        renderSavedGifts();
      }
    });
    resultsSection.appendChild(card);
  });
});

function renderSavedGifts() {
  savedList.innerHTML = '';
  if (savedGifts.length === 0) {
    savedSection.style.display = 'none';
    return;
  }

  savedGifts.forEach(gift => {
    const li = document.createElement('li');
    li.textContent = `❤️ ${gift}`;
    savedList.appendChild(li);
  });

  savedSection.style.display = 'block';
}

clearBtn.addEventListener('click', () => {
  savedGifts = [];
  renderSavedGifts();
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Optional: Dark mode toggle
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
