'use client';
import React from 'react';

import DATA from './data';
import reducer from './reducer';
import StoreItem from './StoreItem';
import CheckoutFlow from './CheckoutFlow';
import './styles.css';

function CheckoutExercise() {
  const [items, dispatch] = React.useReducer(reducer, []);

  React.useEffect(() => {
      dispatch({
        type: 'load-cart',
      });
  },[]);

  return (
    <>
      <h1>Neighborhood Shop</h1>

      <main>
        <div className="items">
          {DATA.map((item) => (
            <StoreItem
              key={item.id}
              item={item}
              handleAddToCart={(item) => {
                console.log('handleAddToCart...');
                dispatch({
                  type: 'add-item',
                  item,
                });
                const localCart = window.localStorage.getItem('cart');
                const localCartItems = localCart
                  ? JSON.parse(localCart)
                  : [];
                const localItemIndex = localCartItems.findIndex(
                  (localItem) => item.id === localItem.id
                );
        
                if (localItemIndex !== -1) {
                  console.log('localItemIndex', localItemIndex)
                  console.log('sumando...')
                  localCartItems[localItemIndex].quantity += 1;
                } else {
                  console.log('Nuevo...')
                  localCartItems.push({
                    ...item,
                    quantity: 1,
                  });
                }
                window.localStorage.setItem(
                  'cart',
                  JSON.stringify(localCartItems)
                );
              }}
            />
          ))}
        </div>

        <CheckoutFlow
          items={items}
          taxRate={0.15}
          handleDeleteItem={(item) =>
            dispatch({
              type: 'delete-item',
              item,
            })
          }
        />
      </main>
    </>
  );
}

export default CheckoutExercise;
