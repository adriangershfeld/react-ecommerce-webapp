import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { addToCart, Product } from '../store.ts';

const fetchProducts = async (category: string): Promise<Product[]> => {
  const baseUrl = 'https://fakestoreapi.com/products';
  const url = category ? `${baseUrl}/category/${category}` : baseUrl;
  const response = await fetch(url);
  return response.json();
};

const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch('https://fakestoreapi.com/products/categories');
  return response.json();
};

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const dispatch = useDispatch();

  // Grabs category list from API and handles caching/loading internally
  const { data: categories } = useQuery<string[]>('categories', fetchCategories);

  // Dynamically fetches products depending on the selected category
  const {
    data: products,
    isLoading,
    error
  } = useQuery<Product[], Error>(
    ['products', selectedCategory],
    () => fetchProducts(selectedCategory)
  );

  // Adds product to cart via Redux dispatch
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product)); // Now properly typed with Product from store
  };

  if (isLoading) return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      Loading products...
    </div>
  );

  if (error) return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      Error loading products: {error.message}
    </div>
  );

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      {/* Category filter dropdown (auto-populated) */}
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

      {/* Product cards displayed in responsive grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px'
      }}>
        {products?.map((product) => (
          <div
            key={product.id}
            style={{
              border: '1px solid #ddd',
              padding: '15px',
              textAlign: 'center'
            }}
          >
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