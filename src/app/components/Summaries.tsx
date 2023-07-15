'use client'
import { 
  Stack,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon
 } from '@mui/material'
 import { DirectionsRun } from "@mui/icons-material";
import { useState } from 'react';


const Summaries = () => {
  const [summary, setSummary] = useState({
    "total_distance": 0,
    "total_calories": 0
  });
  
  const getRunSummary = async () => {
    const url = new URL("http://127.0.0.1:5000/runSummaries");
    const response = await fetch(url.toString());
    const data = await response.json();
    console.log(data);
    
    const tempData = {...data};
    setSummary(tempData);
    
  }
  
  return (
    
    <>
      <Stack direction="column">
        
        <Stack direction="row" spacing={3}>
          <Typography variant='h4'>Run Stats</Typography>
          <Button variant="outlined" onClick={() => {getRunSummary()}}>Get Summary</Button>
        </Stack>
        
        <List>
          <ListItemButton>
            <ListItemIcon>
              <DirectionsRun />
            </ListItemIcon>
            <ListItemText primary={`Total Distance: ${summary['total_distance']} Miles`} />
          </ListItemButton>
        </List>
        
      </Stack>      
    </>
    
  );
  
};

export default Summaries;

