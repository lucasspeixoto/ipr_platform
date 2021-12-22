
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

export const Resume = () => {

  const navigate = useNavigate();

  return (
    <>
      <Button
        variant='contained'
        sx={{ margin: "5rem" }}
        onClick={() => navigate("/signin")}
      >
        Sair
      </Button>
    </>
  )
};
