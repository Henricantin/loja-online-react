import { useState, type ReactNode } from 'react';
import { CartContext } from './CartContext';
import type { Product } from '../types/Product';

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<Product[]>([]);

	const addToCart = (product: Product) => {
		const existingItem = cart.find(item => item.id === product.id);
		if (existingItem) {
			setCart(
				cart.map(item => (item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item))
			);
		} else {
			setCart([...cart, { ...product, quantity: 1 }]);
		}
	};

	const addToCartWithQuantity = (product: Product, quantity: number) => {
		const existingItem = cart.find(item => item.id === product.id);
		if (existingItem) {
			setCart(
				cart.map(item =>
					item.id === product.id ? { ...item, quantity: (item.quantity || 0) + quantity } : item
				)
			);
		} else {
			setCart([...cart, { ...product, quantity }]);
		}
	};

	const removeFromCart = (id: number) => {
		setCart(cart.filter(item => item.id !== id));
	};

	const updateQuantity = (id: number, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(id);
			return;
		}
		setCart(cart.map(item => (item.id === id ? { ...item, quantity } : item)));
	};

	const clearCart = () => {
		setCart([]);
	};

	const getTotalItems = () => {
		return cart.reduce((total, item) => total + (item.quantity || 1), 0);
	};

	const getTotalPrice = () => {
		return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				addToCartWithQuantity,
				removeFromCart,
				updateQuantity,
				clearCart,
				getTotalItems,
				getTotalPrice,
			}}>
			{children}
		</CartContext.Provider>
	);
};
