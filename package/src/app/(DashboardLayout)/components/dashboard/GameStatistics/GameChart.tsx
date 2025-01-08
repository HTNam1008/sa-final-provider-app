import dynamic from "next/dynamic";
import {useTheme } from '@mui/material/styles';
import {Box } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from "react";
import DashboardCard from "../../shared/DashboardCard";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface GameChartProps {
  data: {
    realtimeQuizz: number;
    lacXi: number;
  };
}

const GameChart = ({ data }: GameChartProps) => {
  const theme = useTheme();
  const [series, setSeries] = useState<number[]>([0, 0]);
  const [options] = useState<ApexOptions>({
    chart: {
      type: 'pie' as const,
      height: 350,
    },
    labels: ['Realtime Quizz', 'Lắc Xì'],
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    }],
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  });

  useEffect(() => {
    setSeries([data.realtimeQuizz, data.lacXi]);
  }, [data]);

  return (
    <Box
      sx={{
        boxShadow: theme.shadows[3],
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <DashboardCard title="Game Statistics">
        <Chart
          options={options}
          series={series}
          type="pie"
          height={350}
          width={'100%'}
        />
      </DashboardCard>
    </Box>
  );
};

export default GameChart;