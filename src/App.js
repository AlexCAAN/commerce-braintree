import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'

import commerce from './lib/commerce';
import ProductsList from './components/ProductsList';
import Checkout from  './pages/checkout.js'
import CartNav from './components/CartNav';
import "./styles/main.scss"

const App = ( isCartVisible, renderCartNav ) => {
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

  const handleRemoveFromCart = (lineItemId) => {
    commerce.cart.remove(lineItemId).then((resp) => {
      setCart(resp.cart);
    }).catch((error) => {
      console.error('There was an error removing the item from the cart', error);
    });
  }

  const handleEmptyCart = () => {
    commerce.cart.empty().then((resp) => {
      setCart(resp.cart);
    }).catch((error) => {
      console.error('There was an error emptying the cart', error);
    });
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  
  return (
    <div className="app">
      <Switch>
        <Route
          path="/"
          exact
          render={(props) => {
            return (
              <>
                {/* <Hero
                  merchant={merchant}
                /> */}
                {/* { this.renderCartNav() } */}
                <ProductsList
                  products={products}
                  onAddToCart={handleAddToCart}
                />
                {isCartVisible &&
                  <CartNav
                    cart={cart}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveFromCart={handleRemoveFromCart}
                    onEmptyCart={handleEmptyCart}
                  />
                } 
              </>
            );
          }}
        />
        <Route
          path="/checkout"
          exact
          render={(props) => {
            return (
              <Checkout
                {...props}
                cart={cart}
              />
            )
          }}
        />
      </Switch>
    </div>
  );
};

export default App;