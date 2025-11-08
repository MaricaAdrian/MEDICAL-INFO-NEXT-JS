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
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            {/* CssBaseline normalizează stilurile */}
            <CssBaseline />
            {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
        </ThemeProvider>
    );
}