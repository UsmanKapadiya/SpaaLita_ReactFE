import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
    lastAddedItem: CartItem | null;
}

const initialState: CartState = {
    items: [],
    lastAddedItem: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'> & { quantity?: number }>) => {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            
            if (existingItem) {
                existingItem.quantity += action.payload.quantity || 1;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: action.payload.quantity || 1
                });
            }
            
            state.lastAddedItem = {
                ...action.payload,
                quantity: action.payload.quantity || 1
            };
        },
        
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        
        updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
            const item = state.items.find(item => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        
        clearCart: (state) => {
            state.items = [];
            state.lastAddedItem = null;
        },
        
        clearLastAddedItem: (state) => {
            state.lastAddedItem = null;
        }
    }
});

export const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    clearLastAddedItem 
} = cartSlice.actions;

export default cartSlice.reducer;
