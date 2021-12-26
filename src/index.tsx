import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.component';
import { HelmetProvider } from 'react-helmet-async';
import { SidebarProvider } from './core/contexts/SidebarContext';
import { AuthContextProvider } from '@core/contexts/AuthContext';
import { MembersContextProvider } from '@core/contexts/MembersContext';

ReactDOM.render(
	<HelmetProvider>
		<SidebarProvider>
			<AuthContextProvider>
				<MembersContextProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</MembersContextProvider>
			</AuthContextProvider>
		</SidebarProvider>
	</HelmetProvider>,
	document.getElementById('root'),
);
