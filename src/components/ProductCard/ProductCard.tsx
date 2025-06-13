import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import type { Product } from '../../types/Product';
import './ProductCard.css';

interface Props {
	product: Product;
}

export default function ProductCard({ product }: Props) {
	const { addToCart } = useCart();
	const { success } = useToast();

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		addToCart(product);
		success(`${product.name} adicionado ao carrinho!`);
	};

	return (
		<div className='product-card'>
			<img
				src={product.image}
				alt={product.name}
			/>
			<div className='product-info'>
				<h3>{product.name}</h3>
				<p className='price'>R$ {product.price.toFixed(2).replace('.', ',')}</p>
				<div className='product-actions'>
					<Link
						to={`/product/${product.id}`}
						className='view-details-btn'>
						Ver Detalhes
					</Link>
					<button
						onClick={handleAddToCart}
						className='add-to-cart-btn'
						aria-label={`Adicionar ${product.name} ao carrinho`}>
						🛒 Adicionar
					</button>
				</div>
			</div>
		</div>
	);
}
