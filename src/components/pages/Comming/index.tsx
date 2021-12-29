import { Box, Typography, Container } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import commingLogo from '@assets/coming-soon.svg';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

export const Coming = () => {
  return (
    <>
      <Helmet>
        <title>Status - Coming Soon</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <Box textAlign="center" mb={3}>
            <Container maxWidth="xs">
              <Typography variant="h1" sx={{ mt: 1, mb: 2 }}>
                Em breve...
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                fontWeight="normal"
                sx={{ mb: 4 }}
              >
                Este conteúdo faz parte de uma tarefa ainda em desenvolvimento
              </Typography>
            </Container>
            <img alt="Coming Soon" height={200} src={commingLogo} />
          </Box>
        </Container>
      </MainContent>
    </>
  );
};
