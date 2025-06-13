import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeProvider';
import { CartProvider } from './context/CartProvider';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar/Navbar';
import ProductList from './components/ProductList/ProductList';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Checkout from './pages/Checkout/Checkout';

export default function App() {
	return (
		<ThemeProvider>
			<ToastProvider>
				<CartProvider>
					<Router>
						<Navbar />
						<Routes>
							<Route
								path='/'
								element={<ProductList />}
							/>
							<Route
								path='/product/:id'
								element={<ProductDetails />}
							/>
							<Route
								path='/checkout'
								element={<Checkout />}
							/>
						</Routes>
					</Router>
				</CartProvider>
			</ToastProvider>
		</ThemeProvider>
	);
}
