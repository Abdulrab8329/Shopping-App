import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getProductById, mensProducts, womensProducts } from '../../data/card';
import './Pages.css';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Try to get product from state first (if navigated from a product card)
    const productFromState = location.state?.product;
    
    if (productFromState) {
      setProduct(productFromState);
      setLoading(false);
    } else if (id) {
      // If no product in state but ID in URL, fetch by ID
      const numericId = parseInt(id, 10);
      
      // Try direct lookup in both arrays as a fallback
      let foundProduct = getProductById(numericId);
      
      // If the utility function failed, do a direct lookup in both arrays
      if (!foundProduct) {
        foundProduct = mensProducts.find(p => p.id === numericId) || 
                      womensProducts.find(p => p.id === numericId);
      }
      
      if (foundProduct) {
        setProduct(foundProduct);
      }
      
      setLoading(false);
    } else {
      // No product in state and no ID, redirect to home
      navigate('/');
    }
  }, [id, location.state, navigate]);

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  const handleAddToCart = () => {
    if (product) {
      const itemToAdd = {
        ...product,
        quantity: quantity
      };
      
      // Use prop if available, otherwise fallback to alert
      if (typeof addToCart === 'function') {
        addToCart(itemToAdd);
        alert(`${product.title} (x${quantity}) has been added to the cart!`);
      } else {
        alert(`${product.title} (x${quantity}) has been added to the cart!`);
      }
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading product details...</div>;
  }

  if (!product) {
    return (
      <div className="error-message">
        <h2>Product not found</h2>
        <p>Sorry, we couldn't find a product with ID: {id}</p>
     
        <button onClick={() => navigate('/')} className="btn primary">Go Home</button>
      </div>
    );
  }

  return (
    <div className="product-details">
      <div className="product-details-header">
        <button className="back-button" onClick={handleGoBack}>
          &larr; Back
        </button>
        <h1>{product.title}</h1>
      </div>
      
      <div className="product-details-content">
        <div className="product-details-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-details-info">
          <h2>{product.category}</h2>
          <p className="product-id">Product ID: {product.id}</p>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <input 
              type="number" 
              id="quantity" 
              min="1" 
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          
          <button onClick={handleAddToCart} className="btn primary">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 