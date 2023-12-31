import '@/styles/globals.css'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import type { AppProps } from 'next/app'
import { lightTheme } from "../themes/light-theme"
import { darkTheme } from '../themes/dark-theme';
import UIProvider from '@/context/ui/UIProvider';
import EntriesProvider from '@/context/entries/EntriesProvider';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>


  )
}
