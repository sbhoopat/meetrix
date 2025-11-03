
import ReactDOM from 'react-dom/client';
import "./i18n"; 
import './index.css'; 
import "react-calendar/dist/Calendar.css";  

import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import { AlertProvider } from './components/alerts/AlertContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StyledEngineProvider injectFirst>
    <AlertProvider>
      <App />
    </AlertProvider>
  </StyledEngineProvider>
);
