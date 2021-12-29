import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardMedia,
  IconButton,
  Tooltip,
  Grid,
  TextField,
  Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

import ProfileCoverImage from '@assets/profile-cover.png';
import { IMember } from '@core/types/IMember';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CreateIcon from '@mui/icons-material/Create';
import { sendObservation } from '@core/services/RegistrationService';
import CloseIcon from '@mui/icons-material/Close';
import { SnackbarMessage } from '@components/elements/SnackbarMessage';
import { SnackBarMessageProps } from '@core/types/ISnackbarMessage';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

interface ProfileCoverProps {
  user: Partial<IMember>;
}

export const ProfileCover: React.FC<ProfileCoverProps> = ({ user }) => {
  const [seeObservation, setSeeObservation] = useState(false);
  const [observation, setObservation] = useState('');
  const [snackbar, setSnackbar] = useState<SnackBarMessageProps>({
    open: false,
    severity: null,
    message: null
  });

  const addObservation = () => {
    const userId = user.auth.userId;
    sendObservation(userId, observation);
    setSeeObservation(false);
    setSnackbar({
      open: true,
      severity: 'success',
      message: 'Observação cadastrada.'
    });
  };

  return (
    <>
      <Grid
        container
        spacing={5}
        sx={{ pb: 1, pr: 1 }}
        justifyContent="space-between"
        direction="row"
      >
        <Grid item xs={10} md={11} container direction="column" spacing={0.5}>
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Membro - {user.auth.name}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="subtitle2">
              Está é a página com o resumo das informações dos membros da igreja
              pentecostal reformada
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2} md={1}>
          <Tooltip title="Tabela" placement="left">
            <IconButton
              color="primary"
              component={Link}
              to="/admin/list"
              aria-label="back icon"
              sx={{ p: 0 }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
      <CardCover>
        <CardMedia image={ProfileCoverImage} />
      </CardCover>
      <AvatarWrapper>
        <Avatar
          variant="rounded"
          alt={user.auth.name}
          src={user.auth.photoUrl}
        />
        <ButtonUploadWrapper>
          <Input
            accept="image/*"
            id="icon-button-file"
            name="icon-button-file"
            type="file"
          />
          <label htmlFor="icon-button-file">
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>

      {user.personal && user.supplementary && user.ecclesiastical && (
        <>
          <Grid
            container
            spacing={0}
            sx={{ mt: 2, pb: 1, pl: 2 }}
            justifyContent="space-between"
            direction="column"
          >
            <Grid item>
              <Typography gutterBottom variant="h4">
                {user.auth.name}
              </Typography>
            </Grid>
            <Grid
              item
              container
              justifyContent="space-between"
              alignItems="center"
              direction="row"
            >
              <Grid item>
                <Typography variant="subtitle2" color="text.primary">
                  {user.supplementary.profession} | {user.personal.city}-
                  {user.personal.state} | {user.ecclesiastical.craft}
                </Typography>
              </Grid>

              <Grid item>
                <Tooltip title="Inserir Observação" placement="left">
                  <IconButton
                    color="primary"
                    sx={{ m: 0.5, p: 0.5 }}
                    aria-label="back icon"
                    onClick={() => {
                      setSeeObservation(!seeObservation);
                      setObservation(user?.observation);
                    }}
                  >
                    {seeObservation ? <CloseIcon /> : <CreateIcon />}
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid
                container
                spacing={0}
                justifyContent="space-between"
                direction="column"
              >
                <Grid item>
                  <Grid item>
                    <Typography variant="subtitle2" color="text.secondary">
                      {user?.observation}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {seeObservation ? (
              <>
                <Grid item>
                  <TextField
                    style={{ margin: '0.6rem 0' }}
                    id="text"
                    variant="outlined"
                    multiline
                    required
                    rows={4}
                    fullWidth
                    value={observation}
                    onChange={(event) => setObservation(event.target.value)}
                  />
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    type="button"
                    onClick={addObservation}
                    endIcon={<CreateIcon />}
                  >
                    Inserir Observação
                  </Button>
                </Grid>
              </>
            ) : undefined}
          </Grid>
        </>
      )}

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

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};
