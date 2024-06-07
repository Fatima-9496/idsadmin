import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project import
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from './MonthlyBarChart';
import UniqueVisitorCard from './UniqueVisitorCard';
import OrdersTable from './OrdersTable';
import { useEffect, useState } from 'react';


// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function DashboardDefault() {
  const [totalFlow, setTotalFlow] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalThreat, setTotalThreat] = useState(0);
  const [weeklyAttack, setWeeklyAttack] = useState(0);
  const [barChart, setBarChart] = useState([10, 5, 20, 2, 65, 55, 78]);
  function createData(tracking_no, name, fat, carbs, protein) {
    return { tracking_no, name, fat, carbs, protein };
  }

  const [tableRows, setTableRows] = useState([
    createData(84564564, '192.35.2.1', '192.40.2.1', 2, 6),
    createData(98756325, '192.35.2.1', '192.40.2.1', 1, 4),
    createData(98652366, '192.35.2.1', '192.40.2.1', 1, 2),
    createData(13286564, '192.35.2.1', '192.40.2.1', 1, 2),
    createData(13256498, '192.35.2.1', '192.40.2.1', 2, 1),
    createData(98753263, '192.35.2.1', '192.40.2.1', 2, 5),
    createData(98753275, '192.35.2.1', '192.40.2.1', 1, 7),
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/dashboard_data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTotalFlow(data.totalFlow);
        setTotalUser(data.totalUser);
        setTotalThreat(data.totalThreat);
        setWeeklyAttack(data.weeklyAttack);
        setBarChart(data.barChart);
        setTableRows(data.tableRows);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticEcommerce title="Total Flow Rate" count={totalFlow} percentage={59.3} extra="2,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticEcommerce title="Total Users" count={totalUser} percentage={70.5} extra="3,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <AnalyticEcommerce title="Total Threat Count" count={totalThreat} percentage={27.4} isLoss color="warning" extra="743" />
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      {/* <Grid item xs={12} md={7} lg={8}>
        <UniqueVisitorCard />
      </Grid> */}
      {/* row 3 */}
      <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Flow Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable
            item={tableRows}
          />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Weekly Attack Summary</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="text.secondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">{weeklyAttack}</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart
            item={barChart}
          />
        </MainCard>
      </Grid>

    </Grid>
  );
}
