import * as React from 'react';
import Grid from '@mui/material/Grid';
import BasicCard from '@/app/ui/dashboard/card'
import { Box, Divider, Typography } from '@mui/material';
import BasicTable from '../ui/dashboard/table';

export default function Dashboard() {
  return (<>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs>
            <BasicCard title={'Trainees'} 
            description={'Currently Enrolled'} number={'300'}/>
        </Grid>
        <Grid item xs>
            <BasicCard title={'Payments'} 
            description={'This Month Payments'} number={'LE 4,320'}/>
        </Grid>
        <Grid item xs>
            <BasicCard title={'Sessions'} 
            description={'This Week Sessions'} number={'71'}/>
        </Grid>
      </Grid>
      <Box sx={{mt: 3}}>
        <Typography variant='h2'>Recent Payments</Typography>
        <Divider sx={{my:3}} />
        <BasicTable />
      </Box></>
  );
}