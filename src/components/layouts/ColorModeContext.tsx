import React, { ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { indigo, blueGrey, grey } from '@mui/material/colors';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../utils/localstorage-helpers';

const lightPalette = {
  primary: indigo,
  divider: indigo[700],
  background: {
    default: '#ffffff',
    paper: '#ffffff',
  },
  text: {
    primary: grey[900],
    secondary: grey[800],
  },
};
const darkPalette = {
  primary: blueGrey,
  divider: blueGrey[700],
  background: {
    default: blueGrey[500],
    paper: blueGrey[900],
  },
  text: {
    primary: '#fff',
    secondary: grey[500],
  },
};

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

type Mode = 'light' | 'dark';
interface Props {
  children: ReactNode;
}

export const ColorModeProvider: React.FC<Props> = ({ children }) => {
  const [mode, setMode] = React.useState<Mode>(getItemFromLocalStorage('theme') || 'light');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode: Mode = prevMode === 'light' ? 'dark' : 'light';

          setItemToLocalStorage('theme', newMode);

          return prevMode === 'light' ? 'dark' : 'light';
        });
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light' ? lightPalette : darkPalette),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
