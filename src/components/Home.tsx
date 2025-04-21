import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query'; // Updated import for Vite compatibility
import { useDispatch } from 'react-redux';
import { addToCart, Product } from '../store.ts';
import './Home.css';

/**
 * Fetches products from the API based on selected category
 * @param category - The product category to filter by (empty string for all)
 * @returns Promise containing array of Product objects
 */
const fetchProducts = async (category: string): Promise<Product[]> => {
  const baseUrl = 'https://fakestoreapi.com/products';
  const url = category ? `${baseUrl}/category/${category}` : baseUrl;
  const response = await fetch(url);
  return response.json();
};

/**
 * Fetches available product categories from the API
 * @returns Promise containing array of category strings
 */
const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  return response.json();
};

/**
 * Home Component - Main product listing page with category filtering
 * Uses React Query for data fetching and caching
 */
const Home: React.FC = () => {
  // State for tracking selected category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const dispatch = useDispatch();

  // Query to fetch and cache categories - updated to v4 syntax
  const { data: categories } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Query to fetch products based on selected category - updated to v4 syntax
  // Will automatically refetch when selectedCategory changes
  const {
    data: products,
    isLoading,
    error
  } = useQuery<Product[], Error>({
    queryKey: ['products', selectedCategory],
    queryFn: () => fetchProducts(selectedCategory)
  });

  /**
   * Handles adding a product to the cart
   * Dispatches Redux action with product data
   */
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  // Loading state display
  if (isLoading) return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      Loading products...
    </div>
  );

  // Error state display
  if (error) return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      Error loading products: {error.message}
    </div>
  );

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      {/* Category dropdown filter */}
      <select
        value={selectedCategory}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSelectedCategory(e.target.value)
        }
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '100%',
          maxWidth: '300px'
        }}
      >
        <option value="">All Categories</option>
        {categories?.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Product grid - responsive layout with auto-sizing columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {/* Map through products and render product cards */}
        {products?.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              textAlign: 'center'
            }}
          >
            {/* Product image with fallback for broken images */}
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: '100%',
                height: '200px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200';
              }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            {/* Added product details */}
            {product.description && (
              <p style={{ fontSize: '0.9rem', color: '#666', margin: '8px 0' }}>
                {product.description.slice(0, 128)}...
              </p>
            )}
            {product.rating && (
              <p style={{ fontSize: '0.9rem', color: '#444' }}>
                Rating: {product.rating.rate}/5 ({product.rating.count} reviews)
              </p>
            )}
            {/* Add to cart button - dispatches Redux action */}
            <button
              onClick={() => handleAddToCart(product)}
              className="add-to-cart-btn"
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