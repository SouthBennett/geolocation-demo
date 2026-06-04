/**
 * CategoryButtons component
 * 
 * Responsibility:
 * Allows the user to select a business category.
 * 
 * Props:
 * - selectedCategory: The currently selected category.
 * - setSelectedCategory: Updates the selected category.
 */

import "./CategoryButtons.css"

export default function CategoryButtons({selectedCategory, setSelectedCategory}) {

  // Available business categories users can search for
  const categories = [
    "Restaurants",
    "Cafes",
    "Parks",
    "Shops"
  ];

  return (
    <div>
      {/* Map each category to a button */}
      {categories.map((category) => (
        <button 
          key={category}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}