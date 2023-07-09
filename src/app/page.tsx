'use client';

// import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Button, Grid, Typography } from '@mui/material';
import AllRunsList from './components/AllRunsList';
import Summaries from './components/Summaries';


export default function Home() {
    
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Item>
            <Summaries />
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>
            <AllRunsList />
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
