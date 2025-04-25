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

// Locations database
const locationsDatabase = {
  marina: [
    "Dubai Marina",
    "Marina Residences",
    "Marina Square",
    "Marina Gate",
    "Marina Promenade",
    "Marina Wharf"
  ],
  downtown: [
    "Downtown Dubai",
    "Downtown Views",
    "Downtown Boulevard",
    "Downtown Skyscrapers"
  ],
  palm: [
    "Palm Jumeirah",
    "Palm Views",
    "Palm Tower"
  ],
  creek: [
    "Dubai Creek Harbour",
    "Creek Beach",
    "Creek Marina"
  ],
  business: [
    "Business Bay",
    "Business Tower",
    "Business Square"
  ],
  maryam: [
    "Maryam Island",
    "Maryam Beach",
    "Maryam Gate"
  ]
};

// Search suggestions database
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

// DOM elements
const tabs = document.querySelectorAll('.tab');
const quickLinksContainer = document.getElementById('quickLinks');
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
const suggestionsDropdown = document.getElementById('suggestionsDropdown');

// Initialize quick links for default category (buy)
renderQuickLinks('buy');

// Add event listeners to tabs
tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    const category = this.getAttribute('data-category');
    renderQuickLinks(category);
    closeSuggestions();
  });
});

// Handle search input
searchInput.addEventListener('input', function(e) {
  const query = e.target.value.toLowerCase().trim();
  const activeCategory = document.querySelector('.tab.active').getAttribute('data-category');
  if (query.length >= 2) {
    showSuggestions(query, activeCategory);
  } else {
    closeSuggestions();
  }
});

// Close suggestions on click outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.search-container')) {
    closeSuggestions();
  }
});

// // Show search suggestions based on input and active category
// function showSuggestions(query, category) {
//   suggestionsDropdown.innerHTML = '';

//   // Find matching locations
//   let matchingLocations = [];
//   Object.keys(locationsDatabase).forEach(key => {
//     if (key.includes(query)) {
//       matchingLocations = matchingLocations.concat(locationsDatabase[key]);
//     } else {
//       locationsDatabase[key].forEach(location => {
//         if (location.toLowerCase().includes(query)) {
//           matchingLocations.push(location);
//         }
//       });
//     }
//   });

function showSuggestions(query, category) {
  const locations = Object.values(locationsDatabase)
    .flat()
    .filter(l => l.toLowerCase().includes(query.toLowerCase()));
  let suggs = (quickLinksData[category]||[])
    .filter(s => s.toLowerCase().includes(query.toLowerCase()));

  const html = `
    <div class="suggestions-content">
      <div class="locations-column">
        <div class="column-title">Locations</div>
        ${locations.map(l=>`<div class="suggestion-item">${l}</div>`).join('')}
      </div>
      <div class="suggestions-column">
        <div class="column-title">Suggestions</div>
        ${suggs.map(s=>`<div class="suggestion-item">${s}</div>`).join('')}
      </div>
    </div>
  `;
  suggestionsDropdown.innerHTML = html;
  suggestionsDropdown.classList.add('active');

  suggestionsDropdown
    .querySelectorAll('.suggestion-item')
    .forEach(el => el.addEventListener('click', () => {
      searchInput.value = el.textContent;
      closeSuggestions();
    }));
}


  

  // Remove duplicates
  matchingLocations = [...new Set(matchingLocations)];

  // Find matching suggestions
  let matchingSuggestions = [];
  Object.keys(suggestionsDatabase[category]).forEach(key => {
    if (key.includes(query)) {
      matchingSuggestions = matchingSuggestions.concat(suggestionsDatabase[category][key]);
    } else {
      suggestionsDatabase[category][key].forEach(suggestion => {
        if (suggestion.toLowerCase().includes(query)) {
          matchingSuggestions.push(suggestion);
        }
      });
    }
  });

  // Create two-column layout
  const suggestionsContent = document.createElement('div');
  suggestionsContent.className = 'suggestions-content';

  // Create locations column
  if (matchingLocations.length > 0) {
    const locationsColumn = document.createElement('div');
    locationsColumn.className = 'suggestions-column';

    const locationsTitle = document.createElement('div');
    locationsTitle.className = 'column-title';
    locationsTitle.textContent = 'Locations';
    locationsColumn.appendChild(locationsTitle);

    matchingLocations.slice(0, 6).forEach(location => {
      const locationItem = document.createElement('div');
      locationItem.className = 'suggestion-item';
      locationItem.innerHTML = highlightMatch(location, query);

      locationItem.addEventListener('click', function() {
        searchInput.value = location;
        closeSuggestions();
        searchInput.focus();
      });

      locationsColumn.appendChild(locationItem);
    });

    suggestionsContent.appendChild(locationsColumn);
  }

  // Create suggestions column
  if (matchingSuggestions.length > 0) {
    const suggestionsColumn = document.createElement('div');
    suggestionsColumn.className = 'suggestions-column';

    const suggestionsTitle = document.createElement('div');
    suggestionsTitle.className = 'column-title';
    suggestionsTitle.textContent = 'Suggestions';
    suggestionsColumn.appendChild(suggestionsTitle);

    matchingSuggestions.slice(0, 6).forEach(suggestion => {
      const suggestionItem = document.createElement('div');
      suggestionItem.className = 'suggestion-item';
      suggestionItem.innerHTML = highlightMatch(suggestion, query);

      suggestionItem.addEventListener('click', function() {
        searchInput.value = suggestion;
        closeSuggestions();
        searchInput.focus();
      });

      suggestionsColumn.appendChild(suggestionItem);
    });

    suggestionsContent.appendChild(suggestionsColumn);
  }

  // Show dropdown if there are results
  if (matchingLocations.length > 0 || matchingSuggestions.length > 0) {
    suggestionsDropdown.appendChild(suggestionsContent);
    suggestionsDropdown.classList.add('active');
  } else {
    closeSuggestions();
  }
}

// Close suggestions dropdown
function closeSuggestions() {
  suggestionsDropdown.classList.remove('active');
}

// Highlight matching text in suggestion
function highlightMatch(text, query) {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index >= 0) {
    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);
    return before + '<span class="suggestion-highlight">' + match + '</span>' + after;
  }

  return text;
}

// Render quick links for the selected category
function renderQuickLinks(category) {
  quickLinksContainer.innerHTML = '';
  quickLinksData[category].forEach(link => {
    const linkElement = document.createElement('div');
    linkElement.className = 'quick-link';
    linkElement.textContent = link;
    linkElement.addEventListener('click', function() {
      searchInput.value = link;
      searchInput.focus();
      console.log('Searching for:', link, 'in category:', category);
    });
    quickLinksContainer.appendChild(linkElement);
  });
}

// Search button functionality
searchButton.addEventListener('click', function() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm) {
    const activeCategory = document.querySelector('.tab.active').getAttribute('data-category');
    console.log('Searching for:', searchTerm, 'in category:', activeCategory);
  }
});

// Search input enter key functionality
searchInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    searchButton.click();
  }
});

// Set the background image
//document.querySelector('.hero-container').style.backgroundImage = "url('/api/placeholder/1200/500')";

// Prevent browser autocomplete
searchInput.setAttribute('autocomplete', 'off');
