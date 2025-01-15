import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VoucherChartProps {
  data: {
    labels: string[];
    released: number[];
    unused: number[];
  };
}

const VoucherChart: React.FC<VoucherChartProps> = ({ data }) => {
  const theme = useTheme();

  const chartData: ChartData<'bar'> = {
    labels: data.labels,
    datasets: [
      {
        label: 'Released Vouchers',
        data: data.released,
        backgroundColor: theme.palette.primary.main,
        borderWidth: 1,
      },
      {
        label: 'Unused Vouchers',
        data: data.unused,
        backgroundColor: theme.palette.secondary.main,
        borderWidth: 1,
      }
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Voucher Distribution by Type'
      },
      legend: {
        display: true
      }
    }
  };

  return (
    <Box sx={{ boxShadow: theme.shadows[3], borderRadius: 2, overflow: 'hidden' }}>
      <DashboardCard title="Voucher Statistics">
        <Bar data={chartData} options={options} />
      </DashboardCard>
    </Box>
  );
};

export default VoucherChart;
