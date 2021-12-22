import { CssBaseline } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import ThemeProviderWrapper from "./core/config/theme/schemes/ThemeProvider";

import { appRoutes } from "./core/config/routes/app.routes";
import { authRoutes } from "./core/config/routes/auth.routes";
import { useRoutes } from "react-router-dom";


function App() {

  let isLogged = false

  const app = useRoutes(appRoutes);

  const auth = useRoutes(authRoutes);

  return (
    <ThemeProviderWrapper>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {isLogged ? app : auth}
      </LocalizationProvider>
    </ThemeProviderWrapper>
  );
}

export default App;
