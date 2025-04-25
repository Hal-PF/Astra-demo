document.addEventListener('DOMContentLoaded', () => {
  // ── 1) Data Store ─────────────────────────────────────────────────────────────
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

  // ── 2) DOM Refs ────────────────────────────────────────────────────────────────
  const tabs                = document.querySelectorAll('.tab');
  const quickLinksContainer = document.getElementById('quickLinks');
  const searchInput         = document.querySelector('.search-input');
  const searchButton        = document.querySelector('.search-button');
  const suggestionsDropdown = document.getElementById('suggestionsDropdown');
  const searchContainer     = document.querySelector('.search-container');

  // ── 3) Render Quick-Link Pills ────────────────────────────────────────────────
  function renderQuickLinks(category) {
    quickLinksContainer.innerHTML = '';
    (quickLinksData[category] || []).forEach(text => {
      const pill = document.createElement('div');
      pill.className = 'quick-link';
      pill.textContent = text;
      pill.addEventListener('click', () => {
        searchInput.value = text;
        searchInput.focus();
      });
      quickLinksContainer.appendChild(pill);
    });
  }

  // ── 4) Show Suggestions ───────────────────────────────────────────────────────
  function showSuggestions(query, category) {
    // filter against the same data source
    const list    = quickLinksData[category] || [];
    let matches   = list.filter(item =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    if (matches.length === 0) {
      matches = list.slice(0, 5); // fallback to first 5
    }

    // build dropdown
    suggestionsDropdown.innerHTML = '';
    matches.forEach(s => {
      const item = document.createElement('div');
      item.className = 'suggestion-item';
      item.innerHTML = `
        <div class="suggestion-icon">🔍</div>
        <div class="suggestion-text">${s}</div>
      `;
      item.addEventListener('click', () => {
        searchInput.value = s;
        closeSuggestions();
        searchInput.focus();
      });
      suggestionsDropdown.appendChild(item);
    });
    suggestionsDropdown.classList.add('active');
  }

  // ── 5) Close Suggestions ──────────────────────────────────────────────────────
  function closeSuggestions() {
    suggestionsDropdown.classList.remove('active');
  }

  // ── 6) Event Wiring ───────────────────────────────────────────────────────────
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
    const q         = e.target.value.trim();
    const activeCat = document.querySelector('.tab.active').dataset.category;
    if (q.length >= 2) showSuggestions(q, activeCat);
    else closeSuggestions();
  });

  // c) Click outside closes dropdown
  document.addEventListener('click', e => {
    if (!e.target.closest('.search-container')) {
      closeSuggestions();
    }
  });

  // d) Search button (demo alert)
  searchButton.addEventListener('click', () => {
    alert(`Searching for: ${searchInput.value}`);
  });

  // ── 7) Initialize ─────────────────────────────────────────────────────────────
  renderQuickLinks('buy');
});
