import {
    Typography,
    Box,
    Chip,
    Divider,
} from '@mui/material';
import { Medicament } from '@/types';

interface DetaliiMedicamentProps {
    med: Medicament;
}

// Aceasta este acum o componentă de sine stătătoare
// Primește medicamentul ca 'prop'
export default function DetaliiMedicament({ med }: DetaliiMedicamentProps) {
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                {med.denumire_completa}
            </Typography>
            <Chip
                label={med.prescriptie ? 'Necesită Rețetă' : 'Fără Rețetă'}
                color={med.prescriptie ? 'warning' : 'info'}
                sx={{ mb: 2 }}
            />
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6">Producător:</Typography>
            <Typography variant="body1" gutterBottom>{med.producator}</Typography>

            <Typography variant="h6">Preț:</Typography>
            <Typography variant="body1" color="primary.main" gutterBottom>
                {med.pret.toFixed(2)} RON
            </Typography>

            <Typography variant="h6">Disponibilitate:</Typography>
            <Typography
                variant="body1"
                color={med.disponibilitate ? 'success.main' : 'error.main'}
                gutterBottom
            >
                {med.disponibilitate ? 'În Stoc' : 'Stoc Epuizat'}
            </Typography>

            <Typography variant="h6">Data Expirării:</Typography>
            <Typography variant="body1" gutterBottom>
                {new Date(med.data_expirare).toLocaleDateString('ro-RO')}
            </Typography>

            <Typography variant="h6" sx={{ mt: 2 }}>Descriere:</Typography>
            <Typography variant="body1" paragraph>
                {med.descriere}
            </Typography>
        </Box>
    );
}