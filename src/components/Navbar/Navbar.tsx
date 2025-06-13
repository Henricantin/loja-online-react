// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export default function Navbar() {
	const { theme, toggleTheme } = useTheme();
	const { getTotalItems } = useCart();
	const totalItems = getTotalItems();

	return (
		<nav className='navbar'>
			<div className='navbar-logo'>
				<Link to='/'>🛒 E-commerce</Link>
			</div>
			<ul className='navbar-links'>
				<li>
					<Link to='/'>Produtos</Link>
				</li>
				<li>
					<Link
						to='/checkout'
						className='cart-link'>
						Carrinho {totalItems > 0 && <span className='cart-badge'>{totalItems}</span>}
					</Link>
				</li>
				<li>
					<button
						className='theme-toggle'
						onClick={toggleTheme}
						aria-label={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
						title={`Alternar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}>
						{theme === 'light' ? '🌙' : '☀️'}
					</button>
				</li>
			</ul>
		</nav>
	);
}
