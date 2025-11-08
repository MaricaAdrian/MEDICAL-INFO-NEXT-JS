'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    IconButton,
    Box,
    Snackbar,
    Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ShareIcon from '@mui/icons-material/Share';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const modalId = searchParams.get('modal');
    const [showCopied, setShowCopied] = React.useState(false);

    const handleClose = () => {
        router.push('/medicamente'); // Înapoi la listă fără query param
    };

    const handleCopyLink = async () => {
        if (modalId) {
            const fullUrl = `${window.location.origin}/medicamente/${modalId}`;
            try {
                await navigator.clipboard.writeText(fullUrl);
                setShowCopied(true);
            } catch (err) {
                console.error('Failed to copy link:', err);
            }
        }
    };

    return (
        <>
            <Dialog
                open={true}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
            >
                <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                    <IconButton
                        aria-label="copy link"
                        onClick={handleCopyLink}
                        sx={{ color: (theme) => theme.palette.grey[500] }}
                        title="Copiază link"
                    >
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{ color: (theme) => theme.palette.grey[500] }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
                <DialogContent sx={{ pt: 4 }}>{children}</DialogContent>
            </Dialog>

            <Snackbar
                open={showCopied}
                autoHideDuration={2000}
                onClose={() => setShowCopied(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" sx={{ width: '100%' }}>
                    Link copiat în clipboard!
                </Alert>
            </Snackbar>
        </>
    );
}