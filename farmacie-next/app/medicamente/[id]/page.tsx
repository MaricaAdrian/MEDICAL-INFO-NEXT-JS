import Link from 'next/link';
import {
    Container,
    Paper,
    Button,
    Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import data from '@/data/medicamente.json';
import { Medicament } from '@/types';
import { notFound } from 'next/navigation';
import DetaliiMedicament from '@/app/components/DetaliiMedicament';

// Funcție pentru a găsi medicamentul
function getMedicament(id: string): Medicament | undefined {
    return data.find((med) => med.id === id);
}

// Generăm rutele statice pentru Next.js
export async function generateStaticParams() {
    return data.map((med) => ({
        id: med.id,
    }));
}

// Componenta paginii - afișare completă pentru direct access
export default async function MedicamentDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const med = getMedicament(id);

    if (!med) {
        notFound();
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mb: 2 }}>
                <Link href="/medicamente" style={{ textDecoration: 'none' }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        variant="outlined"
                    >
                        Înapoi la listă
                    </Button>
                </Link>
            </Box>
            <Paper elevation={3} sx={{ p: 4 }}>
                <DetaliiMedicament med={med} />
            </Paper>
        </Container>
    );
}