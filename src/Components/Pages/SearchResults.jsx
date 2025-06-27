import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ProductCard from '../../ReusableComponents/ProductCard/PRoductCard';
import './Pages.css';
import { getAllProducts } from '../../data/card';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const query = searchParams.get('q');
  const navigate = useNavigate();
  const products = getAllProducts();

  useEffect(() => {
    if (query && products) {
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        // Also match product ID directly
        (product.id && product.id.toString() === query)
      );
      setFilteredProducts(filtered);

      // If there's exactly one product that matches by ID, navigate directly to it
      const exactIdMatch = !isNaN(parseInt(query)) && 
        filtered.length === 1 && 
        filtered[0].id.toString() === query.trim();
      
      if (exactIdMatch) {
        navigate(`/product/${filtered[0].id}`, { state: { product: filtered[0] } });
      }
    } else {
      setFilteredProducts([]);
    }
  }, [query, products, navigate]);

  const handleViewProduct = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // If no results or redirect in progress, show appropriate UI
  if (filteredProducts.length === 0) {
    return (
      <div className="category-page">
        <h1>Search Results for "{query || ''}"</h1>
        
        <div className="no-products-message">
          <p>No products found matching "{query || ''}"</p>
          <button onClick={() => navigate('/')} className="btn primary">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <h1>Search Results for "{query || ''}"</h1>
      
      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard 
            key={`${product.id}-${Math.random()}`} 
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;