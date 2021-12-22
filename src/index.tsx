import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import App from "./App.component";
import { HelmetProvider } from "react-helmet-async";
import { SidebarProvider } from "./core/context/SidebarContext";

ReactDOM.render(
  <HelmetProvider>
    <SidebarProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SidebarProvider>
  </HelmetProvider>,
  document.getElementById("root")
);
