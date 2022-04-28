import React, { useState, useEffect } from 'react';

import commerce from './lib/commerce';
import ProductsList from './components/ProductsList';

const App = () => {
  const [products, setProducts] = useState([]);
  

  const fetchProducts = () => {
    commerce.products.list().then((products) => {
      setProducts(products.data);
    }).catch((error) => {
      console.log('There was an error fetching the products', error)
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  
  return (
    <div className="App">
    <ProductsList 
      products={products}
    />
    </div>
  )
};

export default App;