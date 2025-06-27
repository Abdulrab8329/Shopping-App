import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import Home from '../Components/Pages/Home';
import MensClothing from '../Components/Pages/MensClothing';
import WomensClothing from '../Components/Pages/WomensClothing';
import Cart from '../Components/Pages/Cart';
import ProductDetails from '../Components/Pages/ProductDetails';
import './App.css';

// Importing mensProducts
import { mensProducts } from '../data/card';

function App() {
  const [filteredProducts, setFilteredProducts] = useState(mensProducts);
  const [cartItems, setCartItems] = useState([]);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setFilteredProducts(mensProducts);
    } else {
      const filtered = mensProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item
        );
      }
      return [...prevItems, product];
    });
  };

  return (
    <Router>
      <div className="app">
        <Navbar onSearch={handleSearch} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mens" element={<MensClothing products={filteredProducts} />} />
            <Route path="/womens" element={<WomensClothing />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
