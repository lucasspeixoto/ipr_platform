import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardMedia,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';

import ProfileCoverImage from '@assets/profile-cover.png';

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

export const ProfileCover = ({ user }) => {
  return (
    <>
      <Box display="flex" mb={3}>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Perfil - {user.auth.name}
          </Typography>
          <Typography variant="subtitle2">
            Está é a página com o resumo de suas informações como membro da
            igreja pentecostal reformada
          </Typography>
        </Box>
      </Box>
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
      <Box py={2} pl={2} mb={1}>
        <Typography gutterBottom variant="h4">
          {user.auth.name}
        </Typography>
        <Typography variant="subtitle2">{user.description}</Typography>
        <Typography sx={{ py: 2 }} variant="subtitle2" color="text.primary">
          {user.ecclesiastical.craft} | {user.personal.city}-
          {user.personal.state} | {user.ecclesiastical.membership}
        </Typography>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};
