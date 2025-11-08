import {
    Box,
    Typography,
} from '@mui/material';
import data from '@/data/medicamente.json';
import MedicamenteList from '@/app/components/MedicamenteList';
import { Modal } from '@/app/components/Modal';
import DetaliiMedicament from '@/app/components/DetaliiMedicament';

// Aceasta este o Componentă Server (default în App Router)
export default async function MedicamentePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    const modalId = params.modal as string | undefined;

    // Găsim medicamentul pentru modal dacă există
    const selectedMed = modalId ? data.find((med) => med.id === modalId) : null;

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
                Listă Medicamente
            </Typography>

            <MedicamenteList medicamente={data} />

            {selectedMed && (
                <Modal>
                    <DetaliiMedicament med={selectedMed} />
                </Modal>
            )}
        </Box>
    );
}