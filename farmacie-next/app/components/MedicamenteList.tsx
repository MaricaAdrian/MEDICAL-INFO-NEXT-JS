'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { SelectChangeEvent } from '@mui/material';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    CardActionArea,
    Box,
    TextField,
    Pagination,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Medicament } from '@/types';

interface MedicamenteListProps {
    medicamente: Medicament[];
}

export default function MedicamenteList({ medicamente }: MedicamenteListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const filteredMedicamente = useMemo(() => {
        if (!searchQuery) return medicamente;

        const query = searchQuery.toLowerCase();
        return medicamente.filter(
            (med) =>
                med.denumire_completa.toLowerCase().includes(query) ||
                med.producator.toLowerCase().includes(query) ||
                med.descriere.toLowerCase().includes(query)
        );
    }, [medicamente, searchQuery]);

    const totalPages = Math.ceil(filteredMedicamente.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedMedicamente = filteredMedicamente.slice(startIndex, endIndex);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setPage(1);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
        setItemsPerPage(Number(event.target.value));
        setPage(1); // Reset to first page when changing items per page
    };

    return (
        <>
            {/* Search Bar and Items Per Page */}
            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Caută medicamente după nume, producător sau descriere..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel id="items-per-page-label">Pe pagină</InputLabel>
                    <Select
                        labelId="items-per-page-label"
                        value={itemsPerPage}
                        label="Pe pagină"
                        onChange={handleItemsPerPageChange}
                    >
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                        <MenuItem value={24}>24</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {filteredMedicamente.length === 0
                    ? 'Nu s-au găsit rezultate'
                    : `${filteredMedicamente.length} ${filteredMedicamente.length === 1 ? 'medicament găsit' : 'medicamente găsite'}`}
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                    },
                    gap: 3,
                    mb: 4,
                }}
            >
                {paginatedMedicamente.map((med) => (
                    <Link
                        key={med.id}
                        href={`/medicamente?modal=${med.id}`}
                        style={{ textDecoration: 'none', height: '100%' }}
                    >
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                cursor: 'pointer',
                                '&:hover': { boxShadow: 6 },
                            }}
                        >
                            <CardActionArea sx={{ flexGrow: 1 }}>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" component="h2" gutterBottom>
                                        {med.denumire_completa}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                        {med.producator}
                                    </Typography>
                                    <Typography variant="h5" color="primary.main" sx={{ mb: 2 }}>
                                        {med.pret.toFixed(2)} RON
                                    </Typography>
                                    <Chip
                                        label={med.disponibilitate ? 'În Stoc' : 'Stoc Epuizat'}
                                        color={med.disponibilitate ? 'success' : 'error'}
                                        variant="outlined"
                                    />
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Link>
                ))}
            </Box>

            {/* Pagination */}
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                    />
                </Box>
            )}
        </>
    );
}
