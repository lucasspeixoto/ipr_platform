import { appRoutes } from '@config/routes/app.routes';
import { authRoutes } from '@config/routes/auth.routes';
import { useRoutes } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import BaseLayout from '@components/layout/BaseLayout';
import { SuspenseLoader } from '@components/pages/SuspenseLoader';

export const Routes: React.FC = () => {
	const app = useRoutes(appRoutes);

	const auth = useRoutes(authRoutes);

	const { isLogged, isLoading } = useAuth();

	if (isLoading) {
		return (
			<BaseLayout>
				<SuspenseLoader />
			</BaseLayout>
		);
	}

	if (isLogged) {
		return app;
	} else {
		return auth;
	}
};
