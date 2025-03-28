import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

// API Fetch Functions
// Fetches products, with optional category filtering
const fetchProducts = async (category) => {
  const baseUrl = 'https://fakestoreapi.com/products';
  // Dynamically construct URL based on category selection
  const url = category ? `${baseUrl}/category/${category}` : baseUrl;
  const response = await fetch(url);
  return response.json();
};

// Fetches all product categories for dropdown
const fetchCategories = async () => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  return response.json();
};

const Home = () => {
  // Local state to manage selected category
  const [selectedCategory, setSelectedCategory] = useState('');
  
  // Redux dispatch for adding items to cart
  const dispatch = useDispatch();

  // React Query: Fetch Categories
  // - Caches categories 
  // - Automatically handles loading/error states
  const { data: categories } = useQuery('categories', fetchCategories);

  // React Query: Fetch Products
  // - Dynamic fetching based on selected category
  // - Supports real-time filtering
  // - Provides loading and error states
  const { data: products, isLoading, error } = useQuery(
    ['products', selectedCategory], 
    () => fetchProducts(selectedCategory)
  );

  // Cart Interaction Handler
  // Dispatches product to Redux store when "Add to Cart" is clicked
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  // Loading State Rendering
  if (isLoading) return (
    <div style={{padding: '20px', backgroundColor: 'white', color: 'black'}}>
      Loading products...
    </div>
  );

  // Error State Rendering
  if (error) return (
    <div style={{padding: '20px', backgroundColor: 'white', color: 'black'}}>
      Error loading products: {error.message}
    </div>
  );

  return (
    <div style={{padding: '20px', backgroundColor: 'white', color: 'black'}}>
      {/* Dynamic Category Dropdown */}
      <select 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          maxWidth: '300px'
        }}
      >
        <option value="">All Categories</option>
        {/* Dynamically render category options */}
        {categories?.map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      {/* Responsive Product Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {/* Product Card Rendering */}
        {products?.map(product => (
          <div 
            key={product.id} 
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              textAlign: 'center'
            }}
          >
            {/* Product Image with Error Handling */}
            <img 
              src={product.image} 
              alt={product.title}
              style={{
                maxWidth: '100%',
                height: '200px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/200';
              }}
            />
            
            {/* Product Details */}
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            
            {/* Add to Cart Button */}
            <button 
              onClick={() => handleAddToCart(product)}
              style={{
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                cursor: 'pointer'
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;