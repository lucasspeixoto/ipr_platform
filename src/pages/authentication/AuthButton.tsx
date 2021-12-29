import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  icon: ReactNode;
	disabled: boolean;
};

const LoginButton = styled(Button)(
  ({ theme }) => `
		font-size: 15px;
		background: ${theme.colors.primary.main};
		color: ${theme.palette.primary.contrastText};
		box-shadow: ${theme.colors.shadows.primary};
		&:hover {
			background: ${theme.colors.primary.dark};
		}
`
);

export const AuthButton: React.FC<IButtonProps> = ({
  label,
  icon,
  disabled
}) => {
  return (
    <LoginButton
      disabled={disabled}
      type="submit"
      fullWidth
      variant="contained"
      endIcon={icon}
      sx={{ mt: 3, mb: 2 }}
    >
      {label}
    </LoginButton>
  );
};
