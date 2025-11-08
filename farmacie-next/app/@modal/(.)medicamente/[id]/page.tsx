import data from '@/data/medicamente.json';
import { Medicament } from '@/types';
import { notFound } from 'next/navigation';
import DetaliiMedicament from '@/app/components/DetaliiMedicament';
import { Modal } from '@/app/components/Modal';

// Funcție pentru a găsi medicamentul
function getMedicament(id: string): Medicament | undefined {
    return data.find((med) => med.id === id);
}

// Componenta paginii - renderează în MODAL pentru intercepting route
export default async function MedicamentModalPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const med = getMedicament(id);

    if (!med) {
        notFound();
    }

    return (
        <Modal>
            <DetaliiMedicament med={med} />
        </Modal>
    );
}