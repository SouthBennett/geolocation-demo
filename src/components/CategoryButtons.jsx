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
    <div className="category-container">
      {/* Map each category to a button */}
      {categories.map((category) => (
        <button 
          key={category}
          onClick={() => {setSelectedCategory(category); console.log(category);}}
          
          className={
            selectedCategory === category
              ? "category-button selected"
              : "category-button"
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
}