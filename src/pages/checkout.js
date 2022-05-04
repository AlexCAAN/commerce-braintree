import React, { Component } from 'react';

import commerce from '../lib/commerce';


export default class Checkout extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
        checkoutToken: {},
    }
  };
  
  // this doesnt break anything but it doesnt work
  generateCheckoutToken() {
    const { cart } = this.props;
    if (this.props.cart.line_items) {
      commerce.checkout.generateToken(cart.id, { type: 'cart' })
        .then((token) => {
          this.setState({ checkoutToken: token });
      }).catch((error) => {
        console.log('There was an error in generating a token', error);
      });
    }
  }

  // this is supposed to be what it is but cart is not being defined and i cant fix it
  // generateCheckoutToken() {
  //   const { cart } = this.props;
  //   if (cart.line_items.length) {
  //     commerce.checkout.generateToken(cart.id, { type: 'cart' })
  //       .then((token) => {
  //         this.setState({ checkoutToken: token });
  //     }).catch((error) => {
  //       console.log('There was an error in generating a token', error);
  //     });
  //   }
  // }

  // componentDidMount() {
  //   this.generateCheckoutToken();
  // }
  
  render() {
      return (
          <div>
            <button onClick={console.log(this.props.cart.line_items)}>click</button> 
          </div>
      );
  };
}