import React, { useState, useEffect } from 'react';

import commerce from './lib/commerce';
import ProductsList from './components/ProductsList';
import CartNav from './components/CartNav';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = () => {
    commerce.products.list().then((products) => {
      setProducts(products.data);
    }).catch((error) => {
      console.log('There was an error fetching the products', error)
    });
  }
  const fetchCart = () => {
    commerce.cart.retrieve().then((cart) => {
      setCart(cart);
    }).catch((error) => {
      console.log('There was an error fetching the cart', error);
    });
  }
  const handleAddToCart = (productId, quantity) => {
    commerce.cart.add(productId, quantity).then((item) => {
      setCart(item.cart);
    }).catch((error) => {
      console.error('There was an error adding the item to the cart', error);
    });
  }
  const handleUpdateCartQty = (lineItemId, quantity) => {
    commerce.cart.update(lineItemId, { quantity }).then((resp) => {
      setCart(resp.cart);
    }).catch((error) => {
      console.log('There was an error updating the cart items', error);
    });
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  
  return (
    <div className="App">
      <ProductsList
        products={products}
        onAddToCart={handleAddToCart}
      />
      <CartNav 
        cart={cart}
        onUpdateCartQty={handleUpdateCartQty}
      />
    </div>
  )
};

export default App;