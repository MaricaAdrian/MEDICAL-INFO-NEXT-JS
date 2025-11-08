import ThemeRegistry from './ThemeRegistry';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

export const metadata = {
  title: 'Farmacie',
  description: 'Proiect Farmacie',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body>
        <ThemeRegistry>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Farmacie
              </Typography>
            </Toolbar>
          </AppBar>
          <Container component="main" sx={{ mt: 4, mb: 4 }}>
            {children}
          </Container>
        </ThemeRegistry>
      </body>
    </html>
  );
}