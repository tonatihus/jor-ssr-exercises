'use client'
import { produce } from 'immer';

function reducer(state, action) {
  return produce(state, (draftState) => {
    switch (action.type) {
      case 'add-item': {
        console.log('add-item')
        const itemIndex = state.findIndex(
          (item) => item.id === action.item.id
        );

        if (itemIndex !== -1) {
          draftState[itemIndex].quantity += 1;
        } else {
          draftState.push({
            ...action.item,
            quantity: 1,
          });
        }
        return;
      }

      case 'delete-item': {
        console.log('delete-item')
        const itemIndex = state.findIndex(
          (item) => item.id === action.item.id
        );

        draftState.splice(itemIndex, 1);
        const localCart = window.localStorage.getItem('cart');
        const localCartItems = localCart
          ? JSON.parse(localCart)
          : [];
        const localCartItemsFiltered = localCartItems.filter(
          (item) => item.id !== action.item.id
        );
        window.localStorage.setItem(
          'cart',
          JSON.stringify(localCartItemsFiltered)
        );

        return;
      }

      case 'load-cart': {
        if(draftState.length > 0) return;
        console.log('loading cart...')
        const localCart = window.localStorage.getItem('cart');
        const LOCAL_STORAGE_CART = localCart ? JSON.parse(localCart) : [];  
        draftState.push(...LOCAL_STORAGE_CART);
        return;
      }
    }
  });
}

export default reducer;
