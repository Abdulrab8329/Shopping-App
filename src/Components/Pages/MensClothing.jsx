import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../ReusableComponents/ProductCard/PRoductCard";
import "./Pages.css";
import { mensProducts } from "../../data/card";

const MensClothing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const filteredProducts = mensProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    // Also match product ID directly
    (searchQuery && product.id.toString() === searchQuery.trim())
  );

  // Check if search query might be a product ID
  const isSearchingById = !isNaN(parseInt(searchQuery)) && searchQuery.trim() !== '';
  
  // If searching by exact ID and there's exactly one match, navigate directly to the product
  const exactIdMatch = isSearchingById && filteredProducts.length === 1 && 
    filteredProducts[0].id.toString() === searchQuery.trim();
  
  // Auto-navigate to product details if there's an exact ID match
  if (exactIdMatch && searchQuery.trim() !== '') {
    handleViewProduct(filteredProducts[0]);
    // Clear search after navigating
    setSearchQuery('');
  }

  return (
    <div className="category-page">
      <h1>Men's Clothing</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, category, description, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        {isSearchingById && <p className="search-hint">Searching by product ID: {searchQuery}</p>}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="no-products-message">
          <p>No products found matching "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};

export default MensClothing;
