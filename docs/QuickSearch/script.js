//Const quickLinksData = {
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
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Get the category from data attribute
        const category = this.getAttribute('data-category');
        
        // Render quick links for selected category
        renderQuickLinks(category);
        
        // Close suggestions dropdown if open
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

    // Show search suggestions based on input and active category
    function showSuggestions(query, category) {
      // Clear previous suggestions
      suggestionsDropdown.innerHTML = '';
      
      // Find suggestions based on query and category
      let matchingSuggestions = [];
      
      // Check if there are exact key matches
      Object.keys(suggestionsDatabase[category]).forEach(key => {
        if (key.includes(query)) {
          matchingSuggestions = matchingSuggestions.concat(suggestionsDatabase[category][key]);
        }
      });
      
      // If no exact key matches, search through all suggestions in the category
      if (matchingSuggestions.length === 0) {
        Object.values(suggestionsDatabase[category]).flat().forEach(suggestion => {
          if (suggestion.toLowerCase().includes(query)) {
            matchingSuggestions.push(suggestion);
          }
        });
      }
      
      // If still no matches, add some general suggestions
      if (matchingSuggestions.length === 0) {
        const generalSuggestions = {
          rent: ["Properties for Rent in Dubai", "Luxury Apartments for Rent"],
          buy: ["Properties for Sale in Dubai", "Luxury Homes for Sale"],
          new: ["New Developments in Dubai", "Off-Plan Projects"],
          commercial: ["Commercial Spaces in Dubai", "Office Spaces for Rent"]
        };
        
        matchingSuggestions = generalSuggestions[category];
      }
      
      // Limit to 5 suggestions
      matchingSuggestions = matchingSuggestions.slice(0, 5);
      
      // Create suggestion elements
      matchingSuggestions.forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        
        // Highlight the matching part of the suggestion
        const highlightedText = highlightMatch(suggestion, query);
        
        suggestionItem.innerHTML = `
          <div class="suggestion-icon">🔍</div>
          <div class="suggestion-text">${highlightedText}</div>
        `;
        
        // Add click event to suggestion
        suggestionItem.addEventListener('click', function() {
          searchInput.value = suggestion;
          closeSuggestions();
          searchInput.focus();
        });
        
        suggestionsDropdown.appendChild(suggestionItem);
      });
      
      // Show suggestions dropdown
      suggestionsDropdown.classList.add('active');
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
        
        return `${before}<span class="suggestion-highlight">${match}</span>${after}`;
      }
      
      return text;
    }

    // Render quick links for the selected category
    function renderQuickLinks(category) {
      // Clear existing quick links
      quickLinksContainer.innerHTML = '';
      
      // Add new quick links based on selected category
      quickLinksData[category].forEach(link => {
        const linkElement = document.createElement('div');
        linkElement.className = 'quick-link';
        linkElement.textContent = link;
        
        // Add click event to each quick link
        linkElement.addEventListener('click', function() {
          searchInput.value = link;
          // Simulate search
          searchInput.focus();
          // You would normally trigger a search here
          console.log(`Searching for: ${link} in category: ${category}`);
        });
        
        quickLinksContainer.appendChild(linkElement);
      });
    }

    // Search button functionality
    searchButton.addEventListener('click', function() {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        // Get active category
        const activeCategory = document.querySelector('.tab.active').getAttribute('data-category');
        console.log(`Searching for: ${searchTerm} in category: ${activeCategory}`);
        // Here you would normally trigger the search API call
      }
    });

    // Search input enter key functionality
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchButton.click();
      }
    });

    // Set the background image using JavaScript for more dynamic control
    document.querySelector('.hero-container').style.backgroundImage = "url('/api/placeholder/1200/500')";
    
    // Add autocomplete="off" to prevent browser's native autocomplete
    searchInput.setAttribute('autocomplete', 'off');
*//
