'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import GeneralStatistics from '@/app/(DashboardLayout)/components/dashboard/GeneralStatistics';
import GameStatistics from '@/app/(DashboardLayout)/components/dashboard/GameStatistics';
import DiscountVoucher from '@/app/(DashboardLayout)/components/dashboard/DiscountVoucher';
import VoucherStatistics from '@/app/(DashboardLayout)/components/dashboard/VoucherStatistics';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="Campaign Statistics Dashboard">
      <Box>
        <Grid container spacing={3}>
          {/* General Statistics */}
          <Grid item xs={12}>
            <GeneralStatistics />
          </Grid>

          {/* Game and Discount Statistics */}
          <Grid item xs={12} lg={6}>
            <GameStatistics />
          </Grid>
          <Grid item xs={12} lg={6}>
            <DiscountVoucher />
          </Grid>

          {/* Voucher Statistics */}
          <Grid item xs={12}>
            <VoucherStatistics />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;

/* 'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
// components
import SalesOverview from '@/app/(DashboardLayout)/components/dashboard/SalesOverview';
import YearlyBreakup from '@/app/(DashboardLayout)/components/dashboard/YearlyBreakup';
import RecentTransactions from '@/app/(DashboardLayout)/components/dashboard/RecentTransactions';
import ProductPerformance from '@/app/(DashboardLayout)/components/dashboard/ProductPerformance';
import Blog from '@/app/(DashboardLayout)/components/dashboard/Blog';
import MonthlyEarnings from '@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12}>
            <Blog />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
 */