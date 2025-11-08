import Link from 'next/link';
import { Box, Button, Typography, Container } from '@mui/material';
import MedicationIcon from '@mui/icons-material/Medication';

export default function Home() {
  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          gap: 3,
        }}
      >
        <MedicationIcon sx={{ fontSize: 80, color: 'primary.main' }} />
        <Typography variant="h3" component="h1" gutterBottom textAlign="center">
          Bine ați venit la Farmacie
        </Typography>
        <Typography variant="h6" color="text.secondary" textAlign="center" sx={{ mb: 2 }}>
          Descoperă gama noastră completă de medicamente
        </Typography>
        <Link href="/medicamente" style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<MedicationIcon />}
            sx={{ px: 4, py: 1.5 }}
          >
            Vezi Medicamentele
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
