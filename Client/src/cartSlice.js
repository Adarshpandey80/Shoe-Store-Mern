import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name : "cart",
    initialState:{
        cartItem : []
    },
    reducers : {
        addToCart(state , action){
            state.cartItem.push(action.payload)
            console.log(action.payload)
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

    }
}
})
export const {addToCart , decreaseQty , increaseQty , removeItem} = cartSlice.actions;
export default cartSlice.reducer;
