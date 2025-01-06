'use client'
import { useState, ChangeEvent } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Stack,
    Checkbox,
    FormControlLabel,
    MenuItem,
    IconButton,
    Paper,
    Grid,
    Collapse,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useRouter } from 'next/navigation';
import { Dayjs } from 'dayjs';

// Update interface for form data
interface FormData {
    name: string;
    initialVouchers: number;
    category: string;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    description: string;
}


const categories = ['Food', 'Music', 'Restaurant', 'Car', 'Shopping', 'Drink'];

interface VoucherType {
    quantity: number;
    discount: number;
}

export default function CreateCampaign() {
    // Update state initialization
    const [formData, setFormData] = useState<FormData>({
        name: '',
        initialVouchers: 0,
        category: '',
        startDate: null,
        endDate: null,
        description: ''
    });
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [voucherTypes, setVoucherTypes] = useState<VoucherType[]>([]);
    const [expandVouchers, setExpandVouchers] = useState(false);
    const [games, setGames] = useState({
        quiz: false,
        shake: false
    });
    const [quizConfig, setQuizConfig] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const totalAmount = 10;

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleAddVoucherType = () => {
        setVoucherTypes([...voucherTypes, { quantity: 0, discount: 0 }]);
    };

    const handleCreateCampaign = async () => {
        // Handle campaign creation
        router.push('/campaign');
    };

    return (
        <PageContainer title="Create Campaign" description="Create a new campaign">
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Stack spacing={3}>
                    {/* Image Upload */}
                    <Paper sx={{ p: 2 }}>
                        <Button
                            component="label"
                            variant="outlined"
                            startIcon={<CloudUploadIcon />}
                            sx={{ width: '100%', height: '100px' }}
                        >
                            Upload Campaign Image
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </Button>
                    </Paper>

                    {/* Basic Information */}
                    <TextField
                        required
                        fullWidth
                        label="Campaign Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />

                    <TextField
                        required
                        fullWidth
                        type="number"
                        label="Initial Vouchers"
                        value={formData.initialVouchers}
                        onChange={(e) => setFormData({ ...formData, initialVouchers: Number(e.target.value) })}
                    />

                    {/* Voucher Types Expansion */}
                    <Paper sx={{ p: 2 }}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="h6">Voucher Types</Typography>
                            <IconButton onClick={() => setExpandVouchers(!expandVouchers)}>
                                <ExpandMoreIcon />
                            </IconButton>
                        </Stack>
                        <Collapse in={expandVouchers}>
                            {voucherTypes.map((type, index) => (
                                <Grid container spacing={2} key={index} sx={{ mt: 1 }}>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Quantity"
                                            value={type.quantity}
                                            onChange={(e) => {
                                                const newTypes = [...voucherTypes];
                                                newTypes[index].quantity = Number(e.target.value);
                                                setVoucherTypes(newTypes);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            label="Discount (%)"
                                            value={type.discount}
                                            onChange={(e) => {
                                                const newTypes = [...voucherTypes];
                                                newTypes[index].discount = Number(e.target.value);
                                                setVoucherTypes(newTypes);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            ))}
                            <Button sx={{ mt: 2 }} onClick={handleAddVoucherType}>
                                Add Voucher Type
                            </Button>
                        </Collapse>
                    </Paper>

                    {/* Category Selection */}
                    <TextField
                        select
                        required
                        fullWidth
                        label="Category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Date Selection */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack direction="row" spacing={2}>
                            <DatePicker
                                label="Start Date"
                                value={formData.startDate}
                                onChange={(newValue) => setFormData({ ...formData, startDate: newValue })}
                            />
                            <DatePicker
                                label="End Date"
                                value={formData.endDate}
                                onChange={(newValue) => setFormData({ ...formData, endDate: newValue })}
                            />
                        </Stack>
                    </LocalizationProvider>

                    {/* Game Selection */}
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Games</Typography>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={games.quiz}
                                    onChange={(e) => setGames({ ...games, quiz: e.target.checked })}
                                />
                            }
                            label="Real-time Quiz"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={games.shake}
                                    onChange={(e) => setGames({ ...games, shake: e.target.checked })}
                                />
                            }
                            label="Shake Game"
                        />
                        {games.quiz && (
                            <TextField
                                fullWidth
                                select
                                label="Quiz Configuration"
                                value={quizConfig}
                                onChange={(e) => setQuizConfig(e.target.value)}
                                sx={{ mt: 2 }}
                            >
                                <MenuItem value="quiz1">Quiz Set 1</MenuItem>
                                <MenuItem value="quiz2">Quiz Set 2</MenuItem>
                            </TextField>
                        )}
                    </Paper>

                    {/* Description */}
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    {/* Payment Section */}
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Payment</Typography>
                        <Typography variant="h4" sx={{ my: 2 }}>
                            Total: ${totalAmount} {isPaid && <span style={{ color: 'green' }}>(Paid)</span>}
                        </Typography>
                        {!isPaid && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => setIsPaid(true)}
                            >
                                PayPal Checkout
                            </Button>
                        )}
                    </Paper>

                    {/* Create Campaign Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleCreateCampaign}
                        disabled={!isPaid}
                    >
                        Create Campaign
                    </Button>
                </Stack>
            </Box>
        </PageContainer>
    );
}