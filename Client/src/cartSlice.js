import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState:{
        cartItem : [] ,
        buyNowItem : null ,
        checkOutSource : null
    },
    reducers : {
        addToCart(state , action){
            const IteamIndex = state.cartItem.findIndex((item)=> item._id === action.payload._id);
            if (IteamIndex >=0){
                state.cartItem[IteamIndex].qnty += 1;
                return;
            } else {
                  const temp = { ...action.payload, qnty: 1 }
                state.cartItem = [...state.cartItem, temp]
            }
            // state.cartItem.push(action.payload)
            // console.log(action.payload)
        },
       decreaseQty(state , action){
        for(let i=0; i<state.cartItem.length; i++){
            if(state.cartItem[i]._id === action.payload){
               if(state.cartItem[i].qnty > 1){
                state.cartItem[i].qnty -= 1;
               }
            }
        }
    }, 
         increaseQty(state , action){   
        for(let i=0; i<state.cartItem.length; i++){
            if(state.cartItem[i]._id === action.payload){
               state.cartItem[i].qnty += 1;
            }
        }
    }, 
    removeItem(state , action){
         const filteredItems = state.cartItem.filter(
            (item) => item._id !== action.payload
         );
         state.cartItem = filteredItems;    

    } ,
    buyNow (state , action){
        state.buyNowItem = action.payload;
        state.checkOutSource = "buyNow";
    },
      
    checkOutFromCart(state){
        state.checkOutSource = "cart";    
    },

    clearBuyNow(state){
        state.buyNowItem = null;    
        state.checkOutSource = null;
    }
}
})
export const {addToCart , decreaseQty , increaseQty , removeItem , buyNow , clearBuyNow , checkOutFromCart} = cartSlice.actions;
export default cartSlice.reducer;
