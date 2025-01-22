import Header from './common/Header.tsx';
import Body from './Body.tsx';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';

function App() {
  return (
    <>
        <CssBaseline />
        <StyledEngineProvider injectFirst>
          <Header></Header>
          <Body></Body>
        </StyledEngineProvider>
    </>
  )
}

export default App
