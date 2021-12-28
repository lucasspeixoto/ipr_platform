import { usersRoutes } from '@config/routes/users.routes';
import { adminRoutes } from '@config/routes/admin.routes';
import { authRoutes } from '@config/routes/auth.routes';
import { useRoutes } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import BaseLayout from '@components/layout/BaseLayout';
import { SuspenseLoader } from '@components/pages/SuspenseLoader';

export const Routes: React.FC = () => {
  const users = useRoutes(usersRoutes);

  const admin = useRoutes(adminRoutes);

  const auth = useRoutes(authRoutes);

  const { isLogged, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <BaseLayout>
        <SuspenseLoader />
      </BaseLayout>
    );
  }

  if (isLogged) {
    if (user?.admin) {
      return admin;
    } else {
      return users;
    }
  } else {
    return auth;
  }
};
