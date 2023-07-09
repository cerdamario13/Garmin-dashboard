'use client'
import { 
  Stack,
  Typography,
  Button
 } from '@mui/material'
import { useState } from 'react';


const Summaries = () => {
  const [summary, setSummary] = useState({});
  
  const getRunSummary = async () => {
    const url = new URL("http://127.0.0.1:5000/runSummaries");
    const response = await fetch(url.toString());
    const data = await response.json();
    console.log(data);
    setSummary(data)
  }
  
  return (
    
    <>
      <Stack direction="column">
        
        <Stack direction="row" spacing={3}>
          <Typography variant='h4'>Run Stats</Typography>
          <Button variant="outlined" onClick={() => {getRunSummary()}}>Get Summary</Button>
        </Stack>
        
      </Stack>      
    </>
    
  );
  
};

export default Summaries;

