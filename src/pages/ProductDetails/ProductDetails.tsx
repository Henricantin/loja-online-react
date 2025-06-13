import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import './ProductDetails.css';
import api from '../../services/api';
import type { Product } from '../../types/Product';

export default function ProductDetails() {
	const { id } = useParams();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);
	const { addToCartWithQuantity } = useCart();
	const { success } = useToast();

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				setLoading(true);
				const response = await api.get(`/products/${id}`);
				setProduct(response.data);
			} catch (error) {
				console.error('Erro ao carregar produto:', error);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchProduct();
		}
	}, [id]);

	const handleAddToCart = () => {
		if (product) {
			addToCartWithQuantity(product, quantity);
			success(
				`${quantity} ${product.name}${quantity > 1 ? 's' : ''} adicionado${quantity > 1 ? 's' : ''} ao carrinho!`
			);
		}
	};

	const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value);
		if (value > 0) {
			setQuantity(value);
		}
	};

	if (loading) {
		return <div className='loading'>Carregando produto...</div>;
	}

	if (!product) {
		return <div className='error'>Produto não encontrado.</div>;
	}

	return (
		<div className='product-details'>
			<img
				src={product.image}
				alt={product.name}
			/>
			<div className='details'>
				<h1>{product.name}</h1>
				<p className='price'>R$ {product.price.toFixed(2).replace('.', ',')}</p>
				<p className='description'>{product.description}</p>

				<div className='purchase-options'>
					<div className='quantity-selector'>
						<label htmlFor='quantity'>Quantidade:</label>
						<input
							type='number'
							id='quantity'
							min='1'
							value={quantity}
							onChange={handleQuantityChange}
							className='quantity-input'
						/>
					</div>

					<button
						onClick={handleAddToCart}
						className='add-to-cart-btn-large'
						aria-label={`Adicionar ${quantity} ${product.name}(s) ao carrinho`}>
						🛒 Adicionar ao Carrinho ({quantity})
					</button>
				</div>
			</div>
		</div>
	);
}
