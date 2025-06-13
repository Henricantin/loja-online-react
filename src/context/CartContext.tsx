import { createContext, useContext } from 'react';
import type { Product } from '../types/Product';

export interface CartContextType {
	cart: Product[];
	addToCart: (product: Product) => void;
	addToCartWithQuantity: (product: Product, quantity: number) => void;
	removeFromCart: (id: number) => void;
	updateQuantity: (id: number, quantity: number) => void;
	clearCart: () => void;
	getTotalItems: () => number;
	getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType>({
	cart: [],
	addToCart: () => {},
	addToCartWithQuantity: () => {},
	removeFromCart: () => {},
	updateQuantity: () => {},
	clearCart: () => {},
	getTotalItems: () => 0,
	getTotalPrice: () => 0,
});

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
