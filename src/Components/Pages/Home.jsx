import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../../ReusableComponents/ProductCard/PRoductCard';
// import ProductModal from '../../ReusableComponents/ProductModal/ProductModal';
import './Pages.css';

// Sample product data
const featuredProducts = [
  {
    id: 1,
    title: "Men's Casual T-Shirt",
    price: 29.99,
    category: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "This casual t-shirt is perfect for everyday wear. Made from 100% cotton, it's soft, breathable, and comfortable for all-day use."
  },
  {
    id: 2,
    title: "Women's Casual Dress",
    price: 49.99,
    category: "Women's Clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    // image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "A comfortable and stylish casual dress perfect for everyday wear. Made from soft, breathable fabric with a flattering cut."
  },
  {
    id: 3,
    title: "Men's Slim Fit Jeans",
    price: 39.99,
    category: "Men's Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "These slim-fit jeans offer a modern look with a comfortable stretch fabric. Perfect for casual outings or semi-formal occasions."
  },
  {
    id: 4,
    title: "Women's Rain Jacket",
    price: 59.99,
    category: "Women's Clothing",
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    description: "Stay dry in style with this waterproof rain jacket. Features adjustable hood and cuffs with multiple pockets for convenience."
  }
];

const Home = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  const handleAddToCart = (product) => {
    console.log('Added to cart:', product);
    alert(`Added ${product.quantity} ${product.title} to cart!`);
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Welcome to Urban Fashion</h1>
        <p>Discover the latest trends in fashion</p>
       
      </div>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              onClick={handleProductClick}
            />
          ))}
        </div>
      </section>
      
      {/* <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      /> */}
    </div>
  );
};

export default Home;