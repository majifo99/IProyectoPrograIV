import React, { useState, useEffect } from 'react';
import Products from './Products';

const apiUrl = 'https://api.escuelajs.co/api/v1/products';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='results-container'>
      <div className='results'>
        {products.map(product => (
          <div className="result-item" key={product.id}>
            <div className="card border-primary" style={{ maxWidth: '200px' }}>
              <img src={product.images[0]} alt={product.title} className="card-img-top" style={{ maxWidth: '100px', maxHeight: '100px' }} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">Price: ${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
