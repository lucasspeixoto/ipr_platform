import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.component';
import { HelmetProvider } from 'react-helmet-async';
import { SidebarProvider } from './core/contexts/SidebarContext';
import { AuthContextProvider } from '@core/contexts/AuthContext';

ReactDOM.render(
	<HelmetProvider>
		<SidebarProvider>
			<AuthContextProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</AuthContextProvider>
		</SidebarProvider>
	</HelmetProvider>,
	document.getElementById('root'),
);
