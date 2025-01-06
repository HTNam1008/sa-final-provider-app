import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)/components/shared/DashboardCard';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface VoucherData {
  released: number[];
  unused: number[];
}

interface VoucherChartProps {
  data: VoucherData;
  labels: string[];
}

const VoucherChart: React.FC<VoucherChartProps> = ({ data, labels }) => {
  const theme = useTheme();

  const chartData: ChartData<'line'> = {
    labels: labels,
    datasets: [
      {
        label: 'Released Vouchers',
        data: data.released,
        borderColor: theme.palette.primary.main,
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Unused Vouchers',
        data: data.unused,
        borderColor: theme.palette.secondary.main,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <DashboardCard title="Voucher Statistics">
      <Box>
        <Typography variant="h6" gutterBottom>
          Statistics Overview
        </Typography>
        <Line data={chartData} options={options} />
      </Box>
    </DashboardCard>
  );
};

export default VoucherChart;