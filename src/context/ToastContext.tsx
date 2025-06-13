import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import Toast from '../components/Toast/Toast';

interface ToastData {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info';
	duration?: number;
}

interface ToastContextType {
	success: (message: string, duration?: number) => void;
	error: (message: string, duration?: number) => void;
	info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error('useToast must be used within a ToastProvider');
	}
	return context;
};

interface ToastProviderProps {
	children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
	const [toasts, setToasts] = useState<ToastData[]>([]);

	const showToast = useCallback(
		(message: string, type: 'success' | 'error' | 'info' = 'success', duration = 3000) => {
			const id = Date.now().toString();
			const newToast: ToastData = { id, message, type, duration };

			setToasts(prev => [...prev, newToast]);
		},
		[]
	);

	const removeToast = useCallback((id: string) => {
		setToasts(prev => prev.filter(toast => toast.id !== id));
	}, []);

	const success = useCallback(
		(message: string, duration?: number) => {
			showToast(message, 'success', duration);
		},
		[showToast]
	);

	const error = useCallback(
		(message: string, duration?: number) => {
			showToast(message, 'error', duration);
		},
		[showToast]
	);

	const info = useCallback(
		(message: string, duration?: number) => {
			showToast(message, 'info', duration);
		},
		[showToast]
	);

	return (
		<ToastContext.Provider value={{ success, error, info }}>
			{children}
			<div className='toast-container'>
				{toasts.map(toast => (
					<Toast
						key={toast.id}
						message={toast.message}
						type={toast.type}
						duration={toast.duration}
						onClose={() => removeToast(toast.id)}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
};
