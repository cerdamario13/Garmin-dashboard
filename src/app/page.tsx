'use client';

// import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import {  Grid } from '@mui/material';
import Summaries from './components/Summaries';
import ActivitiesDataTable from './components/DataTables/ActivitiesDataTable';

export default function Home() {
    
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4} md={12}>
          <Item>
            <Summaries />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <ActivitiesDataTable
              tableData='Runs'
              urlExtension='allRuns'
            />
          </Item>
        </Grid>
        <Grid item xs={4}>
          
        </Grid>
        <Grid item xs={8}>
          <Item>
            <ActivitiesDataTable
              tableData='Rides'
              urlExtension='allRides'
            />
          </Item>
        </Grid>
        
        <Grid item xs={4}>
          
        </Grid>
        <Grid item xs={8}>
          <Item>
            <ActivitiesDataTable
              tableData='Swims'
              urlExtension='allSwims'
            />
          </Item>
        </Grid>
          
        
      </Grid>
    </>
  )
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
