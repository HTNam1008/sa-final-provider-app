import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import DashboardCard from '../../shared/DashboardCard';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DiscountChartProps {
  data: number[];
}

const DiscountChart: React.FC<DiscountChartProps> = ({ data }) => {
  const theme = useTheme();

  const chartData: ChartData<'bar'> = {
    labels: ['10%', '20%', '30%', '40%', '50%'],
    datasets: [
      {
        label: 'Number of Vouchers',
        data: data,
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.secondary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Box
      sx={{
        boxShadow: theme.shadows[3],
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <DashboardCard title="Discount Voucher Statistics">
        <Bar data={chartData} options={options} />
      </DashboardCard>
    </Box>
  );
};

export default DiscountChart;