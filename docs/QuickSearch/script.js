document.addEventListener('DOMContentLoaded', () => {
  // 1) Data stores
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

  const suggestionsDatabase = {
    rent: { /* … */ },
    buy:  { /* … */ },
    new:  { /* … */ },
    commercial: { /* … */ }
  };
  // (Paste in your full suggestionsDatabase here.)

  // 2) Element references
  const tabs                  = document.querySelectorAll('.tab');
  const quickLinksContainer   = document.getElementById('quickLinks');
  const searchInput           = document.querySelector('.search-input');
  const searchButton          = document.querySelector('.search-button');
  const suggestionsDropdown   = document.getElementById('suggestionsDropdown');

  // 3) Render quick-link pills
  function renderQuickLinks(category) {
    quickLinksContainer.innerHTML = '';
    (quickLinksData[category] || []).forEach(link => {
      const pill = document.createElement('div');
      pill.className = 'quick-link';
      pill.textContent = link;
      pill.addEventListener('click', () => {
        searchInput.value = link;
        searchInput.focus();
      });
      quickLinksContainer.appendChild(pill);
    });
  }

  // 4) Highlight match helper
  function highlightMatch(text, query) {
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      text.slice(0, idx) +
      `<span class="suggestion-highlight">${text.slice(idx, idx + query.length)}</span>` +
      text.slice(idx + query.length)
    );
  }

  // 5) Show suggestions dropdown
  function showSuggestions(query, category) {
    suggestionsDropdown.innerHTML = '';
    const catDB = suggestionsDatabase[category] || {};
    let matches = [];

    // first try keyword keys
    Object.keys(catDB).forEach(key => {
      if (key.includes(query)) matches.push(...catDB[key]);
    });
    // fallback to full-text search
    if (matches.length === 0) {
      Object.values(catDB).flat().forEach(s => {
        if (s.toLowerCase().includes(query)) matches.push(s);
      });
    }
    // fallback to general if still none
    if (matches.length === 0) {
      const general = {
        rent: ["Properties for Rent in Dubai","Luxury Apartments for Rent"],
        buy:  ["Properties for Sale in Dubai","Luxury Homes for Sale"],
        new:  ["New Developments in Dubai","Off-Plan Projects"],
        commercial: ["Commercial Spaces in Dubai","Office Spaces for Rent"]
      };
      matches = general[category] || [];
    }

    matches.slice(0,5).forEach(s => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.innerHTML = `<div class="suggestion-icon">🔍</div>
                        <div class="suggestion-text">${highlightMatch(s, query)}</div>`;
      item.addEventListener('click', () => {
        searchInput.value = s;
        closeSuggestions();
      });
      suggestionsDropdown.appendChild(item);
    });

    suggestionsDropdown.classList.add('active');
  }

  // 6) Close dropdown
  function closeSuggestions() {
    suggestionsDropdown.classList.remove('active');
  }

  // 7) Wire up events
  // a) Tab clicks
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderQuickLinks(tab.dataset.category);
      closeSuggestions();
    });
  });

  // b) Input typing
  searchInput.addEventListener('input', e => {
    const q = e.target.value.trim();
    const activeCat = document.querySelector('.tab.active').dataset.category;
    if (q.length >= 2) showSuggestions(q, activeCat);
    else closeSuggestions();
  });

  // c) Click outside to close
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-container')) {
      closeSuggestions();
    }
  });

  // d) Search button
  searchButton.addEventListener('click', () => {
    alert(`Searching for: ${searchInput.value}`);
  });

  // 8) Initialize default view
  renderQuickLinks('buy');
});
