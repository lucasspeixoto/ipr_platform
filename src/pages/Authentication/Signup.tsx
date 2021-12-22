import React from "react";

import { Button, TextField } from "@mui/material";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography, { TypographyProps } from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import LoginIcon from "@mui/icons-material/Login";
import GoogleIcon from "@mui/icons-material/Google";

import LoginBackground from "../../assets/bg-sign-in-basic.jpeg";

import { styled } from "@mui/material/styles";

function Copyright(props: TypographyProps) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      <Link
        color='primary'
        target='_blank'
        href='https://www.igrejapentecostalreformada.com.br/'
      >
        Igreja Pentecostal Reformada
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginButton = styled(Button)(
  ({ theme }) => `
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      margin-top: .7rem;
      margin-bottom: .7rem;
      &:hover {
        background: ${theme.colors.primary.dark};
      }
`
);

const LoginWithGoogleButton = styled(Button)(
  ({ theme }) => `
      
      box-shadow: ${theme.colors.shadows.primary};
      margin-top: .7rem;
      margin-bottom: .7rem;
     
      .MuiButton-endIcon {
        color: ${theme.palette.error.contrastText}
      },
`
);

export const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    navigate("/dashboard");
  };

  return (
    <Grid container direction='row' sx={{ height: "100vh" }}>
      {/* Background Image */}
      <Grid
        item
        xs={false}
        sm={4}
        md={8}
        sx={{
          backgroundImage: `url(${LoginBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Form */}
      <Grid item container xs={10} sm={6} md={4}>
        <Box
          sx={{
            my: 5,
            mx: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%",
          }}
        >
          <Typography component='h1' variant='h2'>
            Login
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
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
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Senha'
              type='password'
              id='password'
              autoComplete='current-password'
            />

            <LoginButton
              variant='contained'
              type='submit'
              fullWidth
              endIcon={<LoginIcon />}
            >
              Entrar
            </LoginButton>

            <LoginWithGoogleButton
              variant='contained'
              color='secondary'
              type='button'
              fullWidth
              endIcon={<GoogleIcon />}
              onClick={() => alert("google")}
            >
              Login com Google
            </LoginWithGoogleButton>

            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2'>
                  Esqueceu a Senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Não está Cadastrado? Crie uma conta"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 20 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
