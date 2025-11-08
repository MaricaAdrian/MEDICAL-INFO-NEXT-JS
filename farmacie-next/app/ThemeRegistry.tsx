'use client';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
    shape: {
        borderRadius: 8, // Colțuri mai rotunjite
    },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline normalizează stilurile */}
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}