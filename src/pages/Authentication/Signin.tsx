import React from "react";

import { Button, Divider, Stack, TextField } from "@mui/material";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography, { TypographyProps } from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { useTheme } from "@mui/material/styles";

import LoginIcon from "@mui/icons-material/Login";
import GoogleIcon from "@mui/icons-material/Google";

import LoginBackground from "@assets/bg-sign-in-basic.jpeg";

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

const AuthBackgroundImage = styled((props) => (
  <Grid item xs={false} sm={4} md={7} {...props} />
))(({ theme }) => ({
  backgroundImage: `url(${LoginBackground})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

export const Signin = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    navigate("/dashboard");
  };

  return (
    <Grid container direction='row' sx={{ height: "100vh" }}>
      {/* Background Image */}
      <AuthBackgroundImage />

      {/* Form */}
      <Grid item container justifyContent='center' xs={12} sm={8} md={5}>
        <Box
          sx={{
            my: 2,
            mx: 4,
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
            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Divider sx={{ flexGrow: 1 }} orientation='horizontal' />

                <Button
                  variant='outlined'
                  sx={{
                    cursor: "unset",
                    m: 1,
                    py: 0.5,
                    px: 7,
                    borderColor: `${theme.palette.grey[500]} !important`,
                    color: `${theme.palette.primary.contrastText}!important`,
                    fontWeight: 300,
                    borderRadius: `10px`,
                  }}
                  disableRipple
                  disabled
                >
                  Ou
                </Button>

                <Divider sx={{ flexGrow: 1 }} orientation='horizontal' />
              </Box>
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                spacing={1}
              >
                <Typography
                  variant='subtitle1'
                  color='secondary'
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                >
                  Esqueceu a senha?
                </Typography>
                <Typography
                  variant='subtitle1'
                  color='secondary'
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                >
                  Criar Conta?
                </Typography>
              </Stack>
            </Grid>
            <Copyright sx={{ mt: 20 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};