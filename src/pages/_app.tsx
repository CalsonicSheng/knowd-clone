import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Box, StyledEngineProvider, Theme, ThemeProvider, createTheme } from '@mui/material';
import { tunedTypography } from '@/theme/typography';

export default function App({ Component, pageProps }: AppProps) {
  const tunedTheme: Theme = createTheme({
    typography: tunedTypography,
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={tunedTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
