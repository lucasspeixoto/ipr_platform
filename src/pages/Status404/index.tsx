import { Box, Card, Typography, Container, Button } from "@mui/material";
import { Helmet } from "react-helmet-async";

import { styled } from "@mui/material/styles";

import logo404 from "../../assets/404.svg";
import { Link } from "react-router-dom";

const MainContent = styled(Box)(
  ({ theme }) => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const BackButton = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

function Status404() {
  return (
    <>
      <Helmet>
        <title>Status - 404</title>
      </Helmet>
      <MainContent>
        <Container maxWidth='md'>
          <Box textAlign='center'>
            <img alt='404' height={180} src={logo404} />
            <Typography variant='h2' sx={{ my: 2 }}>
              A página que você está procurando não existe!
            </Typography>
            <Typography
              variant='h4'
              color='text.secondary'
              fontWeight='normal'
              sx={{ mb: 4 }}
            >
              Caso a página procurada seja uma página existente entre em contato
              com o suporte, caso contrário clique em voltar
            </Typography>
          </Box>
          <Container maxWidth='xs'>
            <Card sx={{ textAlign: "center", m: 1, p: 2, width: "auto" }}>
              <BackButton href='/registration' variant='outlined'>
                Voltar
              </BackButton>
            </Card>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default Status404;
