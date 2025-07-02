import { useEffect, useState } from 'react';
import './ProductList.css';
import api from '../../services/api';
import ProductCard from '../ProductCard/ProductCard';
import type { Product } from '../../types/Product';

const ITEMS_PER_PAGE = 6;

export default function ProductList() {
	const [products, setProducts] = useState<Product[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await api.get('/products');
				setProducts(response.data);
			} catch (error) {
				console.error('Erro ao carregar produtos:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

	const filteredProducts = products.filter(
		product =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.description.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const endIndex = startIndex + ITEMS_PER_PAGE;
	const currentProducts = filteredProducts.slice(startIndex, endIndex);

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const clearSearch = () => {
		setSearchTerm('');
	};

	const goToPage = (page: number) => {
		setCurrentPage(page);

		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			goToPage(currentPage - 1);
		}
	};

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			goToPage(currentPage + 1);
		}
	};

	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			if (currentPage <= 3) {
				pages.push(1, 2, 3, 4, '...', totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
			} else {
				pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
			}
		}

		return pages;
	};

	if (loading) {
		return (
			<div className='products-container'>
				<div className='loading-message'>Carregando produtos...</div>
			</div>
		);
	}

	return (
		<div className='products-container'>
			<div className='search-section'>
				<div className='search-bar'>
					<div className='search-input-container'>
						<input
							type='text'
							placeholder='Buscar produtos...'
							value={searchTerm}
							onChange={handleSearchChange}
							className='search-input'
						/>
						{searchTerm && (
							<button
								onClick={clearSearch}
								className='clear-search-btn'
								aria-label='Limpar busca'>
								✕
							</button>
						)}
					</div>
				</div>

				{searchTerm && (
					<div className='search-results-info'>
						{filteredProducts.length === 0 ? (
							<p>Nenhum produto encontrado para "{searchTerm}"</p>
						) : (
							<p>
								{filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado
								{filteredProducts.length !== 1 ? 's' : ''} para "{searchTerm}"
							</p>
						)}
					</div>
				)}
			</div>

			<div className='product-list'>
				{currentProducts.length === 0 && !searchTerm ? (
					<div className='no-products'>Nenhum produto disponível</div>
				) : (
					currentProducts.map(product => (
						<ProductCard
							key={product.id}
							product={product}
						/>
					))
				)}
			</div>

			{filteredProducts.length > 0 && totalPages > 1 && (
				<div className='pagination'>
					<div className='pagination-info'>
						Mostrando {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} de{' '}
						{filteredProducts.length} produtos
					</div>

					<div className='pagination-controls'>
						<button
							onClick={goToPreviousPage}
							disabled={currentPage === 1}
							className='pagination-btn pagination-prev'
							aria-label='Página anterior'>
							‹ Anterior
						</button>

						<div className='pagination-numbers'>
							{getPageNumbers().map((page, index) => (
								<button
									key={index}
									onClick={() => typeof page === 'number' && goToPage(page)}
									disabled={page === '...'}
									className={`pagination-btn pagination-number ${
										page === currentPage ? 'active' : ''
									} ${page === '...' ? 'dots' : ''}`}
									aria-label={`Ir para página ${page}`}>
									{page}
								</button>
							))}
						</div>

						<button
							onClick={goToNextPage}
							disabled={currentPage === totalPages}
							className='pagination-btn pagination-next'
							aria-label='Próxima página'>
							Próximo ›
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
