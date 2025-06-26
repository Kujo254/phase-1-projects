const form = document.getElementById('gift-form');
const occasionSelect = document.getElementById('occasion');
const ageSelect = document.getElementById('age');
const resultsSection = document.getElementById('gift-results');
const savedSection = document.getElementById('saved-section');
const savedList = document.getElementById('saved-gifts');
const clearBtn = document.getElementById('clear-saved');

let allGiftIdeas = [];
let savedGifts = [];

// Fetch gift data on page load
fetch("http://localhost:3000/giftIdeas")
  .then(res => res.json())
  .then(data => {
    allGiftIdeas = data;
    console.log("Gift ideas loaded:", allGiftIdeas);

    occasionSelect.addEventListener('change', () => {
      const selectedOccasion = occasionSelect.value;
      const options = allGiftIdeas.filter(item => item.occasion === selectedOccasion);
      const uniqueAgeGroups = [...new Set(options.map(item => item.ageGroup))];

      ageSelect.innerHTML = '<option value="">-- Select Age Group --</option>';
      uniqueAgeGroups.forEach(age => {
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
  const ageGroup = ageSelect.value;

  resultsSection.innerHTML = '';

  if (!occasion || !ageGroup) {
    resultsSection.innerHTML = '<p>Please select both occasion and age group.</p>';
    return;
  }

  const match = allGiftIdeas.find(
    item => item.occasion === occasion && item.ageGroup === ageGroup
  );

  if (!match) {
    resultsSection.innerHTML = '<p>No gift ideas found.</p>';
    return;
  }

  match.gifts.forEach(gift => {
    const card = document.createElement('div');
    card.className = 'gift-card';
    card.innerHTML = `
      <h3>${gift}</h3>
      <button class="save-btn">❤️ Save</button>
    `;
    card.querySelector('.save-btn').addEventListener('click', () => {
      if (!savedGifts.includes(gift)) {
        savedGifts.push(gift);
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
if (savedGifts.length === 0) {
  savedList.innerHTML = "<li>No saved gifts yet ❤️</li>";
}


clearBtn.addEventListener('click', () => {
  savedGifts = [];
  renderSavedGifts();
});

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
