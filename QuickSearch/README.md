# QuickSearch Component

**Purpose:** A search bar with category tabs, suggestion dropdown, and quick links for popular queries in Dubai real estate.

## Usage
- **Categories:** `rent`, `buy`, `new`, `commercial` — users switch context via tabs.
- **Search Input:** Type 2+ characters to see suggestions; press Enter or click Search.
- **Quick Links:** Click a pill to autofill the search input.

## Demo
Open `demo.html` to interact with the live prototype:

[View QuickSearch Demo](./QuickSearch/demo.html)


## Design Tokens
| Token           | Value     | Description                          |
| --------------- | --------- | ------------------------------------ |
| `--color-primary` | `#4B0082` | Active tab and highlight text color |
| `--radius`      | `8px`     | Border radius for pills and dropdown |
| `--shadow`      | `0 4px 12px rgba(0,0,0,0.1)` | Dropdown box shadow  |

## Next Steps
- [ ] Convert to React/MDX story in Storybook
- [ ] Add Chromatic visual tests?
