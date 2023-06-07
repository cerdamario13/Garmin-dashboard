'use client';

// import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  
  //getting data from localHost Python flask
  const getAllRuns = async () => {
    const url = new URL("http://127.0.0.1:5000/allRuns");
    
    const response = await fetch(url.toString());
    const data = await response.json();
    return data;
  }
  
  return (
    <>
      <Button variant="contained" onClick={() => {getAllRuns()}}>GET DATA</Button>
      Hello world!
    </>
  )
}
