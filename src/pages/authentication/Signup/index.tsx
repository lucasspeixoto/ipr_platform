import { useState } from 'react';

import Paper from '@mui/material/Paper';

import LoginBackground from '@assets/bg-sign-in-basic.jpeg';

import {  TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Typography from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Messages } from '@core/helpers/Messages';
import { useAuth } from '@hooks/useAuth';

import { Error } from '@core/helpers/ErrorMessages';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IRegisterData } from '@core/types/IRegister.model';
import { Copyright } from './../Copyright';
import { AuthButton } from '../AuthButton';


const AuthBackgroundImage = styled(props => (
	<Grid item xs={false} sm={4} md={8} {...props} />
))(({ theme }) => ({
	backgroundImage: `url(${LoginBackground})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	backgroundPosition: 'center',
}));

const schema = yup
	.object({
		name: yup.string().trim().required(Messages.required).min(5, Messages.min),
		email: yup
			.string()
			.required(Messages.required)
			.matches(
				/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/,
				Messages.invalidemail,
			),
		password: yup
			.string()
			.trim()
			.required(Messages.required)
			.min(5, Messages.min),
	})
	.required();

export const Signup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegisterData>({
		resolver: yupResolver(schema),
	});

	const navigate = useNavigate();

	const { createUserWithEmailAndPassword } = useAuth();
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword(!showPassword);
	const handleMouseDownPassword = () => setShowPassword(!showPassword);

	const registrationHandler = async (data: IRegisterData) => {
		const { name, email, password } = data;
		try {
			await createUserWithEmailAndPassword(name, email, password);
		} catch (error) {
			const code: string = error.code;
			alert(Error[code]);
		} finally {
			navigate('/');
		}
	};

	return (
		<>
			<Helmet>
				<title>Cadastro</title>
			</Helmet>
			<Grid container component='main' sx={{ height: '100vh' }}>
				<AuthBackgroundImage />

				<Grid item xs={12} sm={8} md={4} component={Paper} square>
					<Box
						sx={{
							my: 8,
							mx: 4,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Typography variant='h1'>Cadastro</Typography>
						<Box
							component='form'
							noValidate
							onSubmit={handleSubmit(registrationHandler)}
							sx={{ mt: 1 }}
						>
							<TextField
								margin='normal'
								required
								fullWidth
								id='name'
								label='Name'
								name='name'
								autoComplete='name'
								autoFocus
								{...register('name')}
								error={errors.name?.message !== undefined}
								helperText={errors.name?.message}
							/>
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
							<TextField
								margin='normal'
								required
								fullWidth
								label='Senha'
								type={showPassword ? 'text' : 'password'}
								id='password'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									),
								}}
								autoComplete='current-password'
								{...register('password')}
								error={errors.password?.message !== undefined}
								helperText={errors.password?.message}
							/>

							<AuthButton label='Cadastrar' icon={<HowToRegIcon />} />

							<Grid container justifyContent='center'>
								<Grid item>
									<Typography
										variant='h6'
										sx={{ cursor: 'pointer' }}
										component={RouterLink}
										to='/'
									>
										Login
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
