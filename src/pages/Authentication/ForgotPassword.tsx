import { useState } from 'react';
import Paper from '@mui/material/Paper';

import LoginBackground from '@assets/bg-sign-in-basic.jpeg';

import { Button, TextField } from '@mui/material';

import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography, { TypographyProps } from '@mui/material/Typography';

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

interface TForgotPasswordForm {
	email: string;
}

function Copyright(props: TypographyProps) {
	return (
		<Typography
			variant='body2'
			color='text.secondary'
			align='center'
			{...props}
		>
			{'Copyright © '}
			<Link
				color='primary'
				href='https://www.igrejapentecostalreformada.com.br/'
			>
				Igreja Pentecostal Reformada
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const LoginButton = styled(Button)(
	({ theme }) => `
      font-size: 15px;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      &:hover {
        background: ${theme.colors.primary.dark};
      }
`,
);

const AuthBackgroundImage = styled(props => (
	<Grid item xs={false} sm={4} md={9} {...props} />
))(({ theme }) => ({
	backgroundImage: `url(${LoginBackground})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
}));

const schema = yup
	.object({
		email: yup
			.string()
			.required(Messages.required)
			.matches(
				/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/,
				Messages.invalidemail,
			),
	})
	.required();

export const ForgotPassword = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ILoginData>({
		resolver: yupResolver(schema),
	});

	const [isLoading, setIsLoading] = useState(false);
	const { sendPasswordResetEmail } = useAuth();

	const requestEmailReset = async (data: TForgotPasswordForm) => {
		setIsLoading(true);
		const { email } = data;

		try {
			await sendPasswordResetEmail(email);
			setIsLoading(false);
			alert('Email Enviado');
		} catch (error) {
			setIsLoading(false);
			const code: string = error.code;
			alert(Error[code]);
		}
	};

	return (
		<>
			<Helmet>
				<title>Recuperar Senha</title>
			</Helmet>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<AuthBackgroundImage />

				<Grid item xs={12} sm={8} md={3} component={Paper} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography variant='h1'>Recuperar Senha</Typography>
						<Box
							component='form'
							noValidate
							onSubmit={handleSubmit(requestEmailReset)}
							sx={{ mt: 1 }}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								id='email'
								label='Email'
								name='email'
								autoComplete='email'
								autoFocus
								{...register('email')}
								error={errors.email?.message !== undefined}
								helperText={errors.email?.message}
							/>
							<></>

							<LoginButton
								disabled={isLoading}
								type='submit'
								fullWidth
								variant='contained'
								endIcon={<LockOpenIcon />}
								sx={{ mt: 3, mb: 2 }}
							>
								Recuperar
							</LoginButton>

							<Grid container>
								<Grid item xs>
									<Typography
										variant='h6'
										sx={{ cursor: 'pointer' }}
										component={RouterLink}
										to='/'
									>
										Login
									</Typography>
								</Grid>
								<Grid item>
									<Typography
										variant='h6'
										sx={{ cursor: 'pointer' }}
										component={RouterLink}
										to='/signup'
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
		</>
	);
};
