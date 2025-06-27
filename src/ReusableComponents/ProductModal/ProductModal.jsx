import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductModal.css';

const ProductModal = ({ product, isOpen, onClose }) => {
  const navigate = useNavigate();

  // Add/remove body class to prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Add keyboard support for closing the modal with Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) {
    return null;
  }

  const handleAddToCart = () => {
    alert(`${product.title} has been added to the cart!`);
    onClose();
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`, { state: { product } });
    onClose();
  };

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        
        <div className="modal-product-content">
          <div className="modal-product-image">
            <img src={product.image} alt={product.title} />
          </div>
          
          <div className="modal-product-info">
            <h2>{product.title}</h2>
            <p className="modal-product-category">{product.category}</p>
            <p className="modal-product-price">${product.price}</p>
            <p className="modal-product-description">{product.description}</p>
            
            <div className="modal-buttons">
              <button className="btn primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn secondary" onClick={handleViewDetails}>
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
