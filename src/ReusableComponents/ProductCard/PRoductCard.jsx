import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  
  if (!product) {
    return <div className="product-card loading">Loading...</div>;
  }
  
  const handleCardClick = () => {
    // Create a copy of the product to ensure we're not passing references
    const productCopy = {
      id: product.id,
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description
    };
    
    // Navigate directly to product detail page with product data in state
    navigate(`/product/${productCopy.id}`, { 
      state: { product: productCopy } 
    });
  };
  
  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-info">
        <h3>{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-id">ID: {product.id}</p>
      </div>
    </div>
  );
};

export default ProductCard;