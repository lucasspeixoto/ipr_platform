import React from "react";

import { CssBaseline } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const ButtonForTest = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

export const TestButton = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CssBaseline />
      <ButtonForTest
        sx={{ ml: 1 }}
        startIcon={<DeleteTwoToneIcon />}
        variant='contained'
      >
        Testess
      </ButtonForTest>
    </LocalizationProvider>
  );
};
