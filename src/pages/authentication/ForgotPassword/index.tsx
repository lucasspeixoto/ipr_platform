import { useState } from 'react';
import Paper from '@mui/material/Paper';

import LoginBackground from '@assets/bg-sign-in-basic.jpeg';

import { TextField } from '@mui/material';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

import LockOpenIcon from '@mui/icons-material/LockOpen';

import { styled } from '@mui/material/styles';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Messages } from '@core/helpers/Messages';
import { useAuth } from '@hooks/useAuth';
import { ILoginData } from '@core/types/ILogin.model';
import { Error } from '@core/helpers/ErrorMessages';

import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Copyright } from './../Copyright';
import { AuthButton } from '../AuthButton';
import { SnackBarMessageProps } from '@core/types/ISnackbarMessage';
import { SnackbarMessage } from '@components/elements/SnackbarMessage';

interface TForgotPasswordForm {
  email: string;
}

const AuthBackgroundImage = styled((props) => (
  <Grid item xs={false} sm={4} md={9} {...props} />
))(({ theme }) => ({
  backgroundImage: `url(${LoginBackground})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}));

const schema = yup
  .object({
    email: yup
      .string()
      .required(Messages.required)
      .matches(
        /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/,
        Messages.invalidemail
      )
  })
  .required();

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginData>({
    resolver: yupResolver(schema)
  });
  const [snackbar, setSnackbar] = useState<SnackBarMessageProps>({
    open: false,
    severity: null,
    message: null
  });

  const [isLoading, setIsLoading] = useState(false);
  const { sendPasswordResetEmail } = useAuth();

  const requestEmailReset = async (data: TForgotPasswordForm) => {
    setIsLoading(true);
    const { email } = data;

    const result = sendPasswordResetEmail(email);
    result
      .then(() => {
        setIsLoading(false);
        setSnackbar({
          open: true,
          severity: 'info',
          message: 'E-mail Enviado'
        });
      })
      .catch((error) => {
        setIsLoading(false);
        const code: string = error.code;
        setSnackbar({
          open: true,
          severity: 'error',
          message: Error[code]
        });
      });
  };

  return (
    <>
      <Helmet>
        <title>Recuperar Senha</title>
      </Helmet>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <AuthBackgroundImage />

        <Grid item xs={12} sm={8} md={3} component={Paper} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography variant="h1">Recuperar Senha</Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(requestEmailReset)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                {...register('email')}
                error={errors.email?.message !== undefined}
                helperText={errors.email?.message}
              />
              <AuthButton
                disabled={isLoading}
                label="Recuperar"
                icon={<LockOpenIcon />}
              />

              <Grid container>
                <Grid item xs>
                  <Typography
                    variant="h6"
                    sx={{ cursor: 'pointer' }}
                    component={RouterLink}
                    to="/"
                  >
                    Login
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="h6"
                    sx={{ cursor: 'pointer' }}
                    component={RouterLink}
                    to="/signup"
                  >
                    Criar Conta
                  </Typography>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 15 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      {snackbar.open && (
        <SnackbarMessage
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={setSnackbar}
        />
      )}
    </>
  );
};
