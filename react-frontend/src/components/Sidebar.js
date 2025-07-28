import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

const Sidebar = ({ 
  sortBy, 
  setSortBy, 
  categories = [], 
  selectedCategory,
  onCategoryFilter,
  filters, 
  setFilters, 
  clearAllFilters 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hoveredOption, setHoveredOption] = useState(null);
  
  const sortOptions = ['Recommend', 'Name A-Z', 'Name Z-A', 'Category', 'Item No'];
  
  const filterCategories = [
    { 
      name: 'By Category', 
      key: 'category', 
      options: categories.map(cat => ({ id: cat.id, name: cat.name }))
    }
  ];

  const handleFilterChange = (filterKey, value) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: prev[filterKey].includes(value)
        ? prev[filterKey].filter(item => item !== value)
        : [...prev[filterKey], value]
    }));
  };

  const handleCategorySelect = (categoryId) => {
    if (selectedCategory === categoryId) {
      // If same category clicked, deselect it
      onCategoryFilter(null);
    } else {
      // Select new category
      onCategoryFilter(categoryId);
    }
  };

  return (
    <aside className="sidebar">
      {/* Sort By Section */}
      <div className="sort-section">
        <label className="sort-label">Sort by</label>
        <div className="custom-dropdown">
          <div 
            className="dropdown-header"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{sortBy}</span>
            <ChevronDown size={16} />
          </div>
          {isDropdownOpen && (
            <div className="dropdown-options">
              {sortOptions.map((option, index) => (
                <div
                  key={option}
                  className={`dropdown-option ${hoveredOption === option ? 'hovered' : ''}`}
                  onClick={() => {
                    setSortBy(option);
                    setIsDropdownOpen(false);
                  }}
                  onMouseEnter={() => setHoveredOption(option)}
                  onMouseLeave={() => setHoveredOption(null)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Clear All Button */}
      <button onClick={clearAllFilters} className="clear-all-btn">
        Clear all
      </button>

      {/* Filter Categories */}
      <div className="filter-categories">
        {filterCategories.map((category, index) => (
          <div key={category.key} className="filter-category">
            <div className="filter-header">
              <span className="filter-title">{category.name}</span>
              <ChevronRight size={16} />
            </div>
            <div className="filter-options">
              {category.options.map(option => (
                <label key={option.id} className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategory === option.id}
                    onChange={() => handleCategorySelect(option.id)}
                  />
                  <span>{option.name}</span>
                </label>
              ))}
            </div>
            {index < filterCategories.length - 1 && <div className="filter-divider"></div>}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar; 