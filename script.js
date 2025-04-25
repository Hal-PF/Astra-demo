// Quick links data by category
const quickLinksData = {
  rent: [
    "Apartments for Rent in Dubai",
    "Apartments for Rent in Downtown Dubai",
    "Apartments for Rent in Dubai Marina",
    "Villas for Rent in Dubai",
    "Studios for Rent in Dubai"
  ],
  buy: [
    "Apartments for Sale in Business Bay",
    "Apartments for Sale in Dubai Marina",
    "Villas for Sale in Dubai",
    "Penthouses for Sale",
    "Townhouses for Sale"
  ],
  new: [
    "Off Plan Projects in UAE",
    "New Projects in Dubai",
    "New Projects in Abu Dhabi",
    "Waterfront Developments",
    "Luxury Off-Plan Projects"
  ],
  commercial: [
    "Office Spaces in Dubai",
    "Retail Shops for Rent",
    "Warehouses for Sale",
    "Commercial Properties in Business Bay",
    "Commercial Plots"
  ]
};

// Suggestions database by category
const suggestionsDatabase = {
  rent: {
    marina: [
      "Apartments for Rent in Dubai Marina",
      "1-Bedroom Apartments for Rent in Dubai Marina",
      "Luxury Apartments for Rent in Dubai Marina",
      "Villas for Rent near Dubai Marina"
    ],
    downtown: [
      "Apartments for Rent in Downtown Dubai",
      "Luxury Studios for Rent in Downtown",
      "2-Bedroom Apartments for Rent in Downtown Dubai"
    ],
    burj: [
      "Apartments for Rent with Burj Khalifa View",
      "Luxury Apartments for Rent near Burj Khalifa",
      "Penthouses for Rent near Burj Khalifa",
      "Apartments for Rent in Burj Residence"
    ],
    palm: [
      "Villas for Rent in Palm Jumeirah",
      "Beach Houses for Rent in Palm Jumeirah",
      "Luxury Apartments for Rent in Palm Jumeirah"
    ]
  },
  buy: {
    marina: [
      "Apartments for Sale in Dubai Marina",
      "3-Bedroom Apartments for Sale in Dubai Marina",
      "Penthouses for Sale in Dubai Marina",
      "Off-Plan Properties for Sale in Dubai Marina"
    ],
    downtown: [
      "Apartments for Sale in Downtown Dubai",
      "Luxury Units for Sale in Downtown Dubai",
      "Investment Properties for Sale in Downtown"
    ],
    burj: [
      "Apartments for Sale with Burj Khalifa View",
      "Luxury Properties for Sale near Burj Khalifa",
      "Investment Opportunities near Burj Khalifa"
    ],
    palm: [
      "Villas for Sale in Palm Jumeirah",
      "Beach Properties for Sale in Palm Jumeirah",
      "Signature Villas for Sale in Palm Jumeirah"
    ]
  },
  new: {
    marina: [
      "New Developments in Dubai Marina",
      "Off-Plan Projects in Dubai Marina",
      "Dubai Marina Upcoming Projects",
      "Waterfront New Projects in Dubai Marina"
    ],
    downtown: [
      "New Launches in Downtown Dubai",
      "Off-Plan Apartments in Downtown Dubai",
      "Emaar New Projects in Downtown"
    ],
    burj: [
      "New Projects near Burj Khalifa",
      "Off-Plan Properties with Burj Khalifa View",
      "Luxury New Developments around Burj Khalifa"
    ],
    creek: [
      "New Projects in Dubai Creek Harbour",
      "Waterfront Developments in Dubai Creek",
      "Off-Plan Apartments in Dubai Creek"
    ]
  },
  commercial: {
    marina: [
      "Office Spaces for Sale in Dubai Marina",
      "Retail Units for Rent in Dubai Marina",
      "Commercial Properties in Dubai Marina"
    ],
    downtown: [
      "Office Spaces in Downtown Dubai",
      "Commercial Properties for Investment in Downtown",
      "Retail Shops for Rent in Downtown Dubai"
    ],
    burj: [
      "Office Spaces in Burj Khalifa",
      "Commercial Units near Burj Khalifa",
      "Retail Spaces for Rent with Burj Khalifa View"
    ],
    business: [
      "Office Spaces in Business Bay",
      "Commercial Properties in Business Bay",
      "Retail Units for Rent in Business Bay"
    ]
  }
};

// DOM Elements
const tabs = document.querySelectorAll('.tab');
const quickLinksContainer = document.getElementById('quickLinks');
const searchInput = document.querySelector('.search-input');
const suggestionsDropdown = document.getElementById('suggestionsDropdown');
const searchButton = document.querySelector('.search-button');

// Render quick links based on category
function renderQuickLinks(category) {
  quickLinksContainer.innerHTML = '';
  (quickLinksData[category] || []).forEach(link => {
    const div = document.createElement('div');
    div.className = 'quick-link';
    div.textContent = link;
    div.onclick = () => searchInput.value = link;
    quickLinksContainer.appendChild(div);
  });
}

// Tab click handler
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderQuickLinks(tab.dataset.category);
    suggestionsDropdown.classList.remove('active');
  });
});

// Search input suggestions handler
searchInput.addEventListener('input', e => {
  const query = e.target.value.toLowerCase().trim();
  const category = document.querySelector('.tab.active').dataset.category;
  const db = suggestionsDatabase[category] || {};

  if (query.length < 2) {
    suggestionsDropdown.classList.remove('active');
    return;
  }

  let matches = [];
  Object.keys(db).forEach(key => {
    if (key.includes(query)) {
      matches.push(...db[key]);
    }
  });

  if (!matches.length) {
    Object.values(db).flat().forEach(item => {
      if (item.toLowerCase().includes(query)) {
        matches.push(item);
      }
    });
  }

  if (!matches.length) {
    const general = {
      rent: ["Properties for Rent in Dubai", "Luxury Apartments for Rent"],
      buy: ["Properties for Sale in Dubai", "Luxury Homes for Sale"],
      new: ["New Developments in Dubai", "Off-Plan Projects"],
      commercial: ["Commercial Spaces in Dubai", "Office Spaces for Rent"]
    };
    matches = general[category] || [];
  }

  suggestionsDropdown.innerHTML = '';
  matches.slice(0, 5).forEach(item => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.innerHTML = `<div class="suggestion-icon">🔍</div><div class="suggestion-text">${item.replace(
      new RegExp(query, 'i'),
      match => `<span class="suggestion-highlight">${match}</span>`
    )}</div>`;
    div.onclick = () => {
      searchInput.value = item;
      suggestionsDropdown.classList.remove('active');
    };
    suggestionsDropdown.appendChild(div);
  });
  suggestionsDropdown.classList.add('active');
});

// Close suggestions on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.search-container')) {
    suggestionsDropdown.classList.remove('active');
  }
});

// Search button click handler
searchButton.addEventListener('click', () => {
  const term = searchInput.value.trim();
  if (term) {
    alert(`Search for: ${term}`);
  }
});

// Initialize default quick links
renderQuickLinks('buy');
``` for GitHub Setup
Follow these steps to create and populate your **design-system-demos** repository on GitHub:

1. **Create the Repository**
   - Go to GitHub and click **New** repository.
   - Name it `design-system-demos` (or your preferred name).
   - Add a description and set visibility (public/private).
   - Click **Create repository**.

2. **Clone Locally**
   ```bash
   git clone https://github.com/<your-org>/design-system-demos.git
   cd design-system-demos
