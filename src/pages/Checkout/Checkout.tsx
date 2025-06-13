// src/pages/Checkout.tsx
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Checkout.css';

export default function Checkout() {
	const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const [orderCompleted, setOrderCompleted] = useState(false);

	const handleQuantityChange = (id: number, newQuantity: number) => {
		if (newQuantity < 1) {
			removeFromCart(id);
		} else {
			updateQuantity(id, newQuantity);
		}
	};

	const handleCheckout = async () => {
		setIsCheckingOut(true);

		setTimeout(() => {
			setOrderCompleted(true);
			clearCart();
			setIsCheckingOut(false);
		}, 2000);
	};

	if (orderCompleted) {
		return (
			<div className='checkout'>
				<div className='order-success'>
					<h2>🎉 Pedido Realizado com Sucesso!</h2>
					<p>
						Obrigado pela sua compra. Seu pedido foi processado e você receberá um e-mail de confirmação em
						breve.
					</p>
					<button
						onClick={() => setOrderCompleted(false)}
						className='continue-shopping-btn'>
						Continuar Comprando
					</button>
				</div>
			</div>
		);
	}

	if (cart.length === 0) {
		return (
			<div className='checkout'>
				<div className='empty-cart'>
					<h2>🛒 Seu Carrinho está Vazio</h2>
					<p>Que tal adicionar alguns produtos incríveis?</p>
					<a
						href='/'
						className='continue-shopping-btn'>
						Ver Produtos
					</a>
				</div>
			</div>
		);
	}

	return (
		<div className='checkout'>
			<div className='cart-header'>
				<h2>🛒 Meu Carrinho</h2>
				<p>
					{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}
				</p>
			</div>

			<div className='cart-content'>
				<div className='cart-items'>
					{cart.map(item => (
						<div
							key={item.id}
							className='cart-item'>
							<img
								src={item.image}
								alt={item.name}
								className='item-image'
							/>
							<div className='item-details'>
								<h3>{item.name}</h3>
								<p className='item-price'>R$ {item.price.toFixed(2).replace('.', ',')}</p>
							</div>
							<div className='item-controls'>
								<div className='quantity-controls'>
									<button
										onClick={() => handleQuantityChange(item.id, (item.quantity || 1) - 1)}
										className='quantity-btn'
										aria-label='Diminuir quantidade'>
										−
									</button>
									<span className='quantity-display'>{item.quantity || 1}</span>
									<button
										onClick={() => handleQuantityChange(item.id, (item.quantity || 1) + 1)}
										className='quantity-btn'
										aria-label='Aumentar quantidade'>
										+
									</button>
								</div>
								<button
									onClick={() => removeFromCart(item.id)}
									className='remove-btn'
									aria-label={`Remover ${item.name} do carrinho`}>
									🗑️
								</button>
							</div>
							<div className='item-total'>
								<strong>R$ {(item.price * (item.quantity || 1)).toFixed(2).replace('.', ',')}</strong>
							</div>
						</div>
					))}
				</div>

				<div className='cart-summary'>
					<div className='summary-section'>
						<h3>Resumo do Pedido</h3>
						<div className='summary-line'>
							<span>
								Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'})
							</span>
							<strong>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</strong>
						</div>
						<div className='summary-line'>
							<span>Frete</span>
							<strong>Grátis</strong>
						</div>
						<div className='summary-line total'>
							<span>Total</span>
							<strong>R$ {getTotalPrice().toFixed(2).replace('.', ',')}</strong>
						</div>
					</div>

					<div className='checkout-actions'>
						<button
							onClick={handleCheckout}
							disabled={isCheckingOut}
							className='checkout-btn'>
							{isCheckingOut ? '⏳ Processando...' : '🛍️ Finalizar Compra'}
						</button>
						<button
							onClick={clearCart}
							className='clear-cart-btn'
							disabled={isCheckingOut}>
							Limpar Carrinho
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
