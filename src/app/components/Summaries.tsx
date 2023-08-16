'use client'
import { 
  Stack,
  Typography,
  Button,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ListItem
 } from '@mui/material'
 import { DirectionsRun, Whatshot, DirectionsBike, Pool } from "@mui/icons-material";
import { useState } from 'react';
import DistanceDialog from './DistanceDialog';


const Summaries = () => {
  const [summary, setSummary] = useState({
    "total_distance": 0,
    "total_calories": 0
  });
  const [openDistanceDialog, setDistanceDialog] = useState(false);
  
  
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
          
          <ListItemButton onClick={() => {setDistanceDialog(true)}}>
            <ListItemIcon>
              <DirectionsRun />
            </ListItemIcon>
            <ListItemText primary={`Run Distance: ${summary['total_distance']} Miles`} />
          </ListItemButton>
          
          <ListItemButton >
            <ListItemIcon>
              <Whatshot />
            </ListItemIcon>
            <ListItemText primary={`Run Calories ${summary['total_calories']} Cal`} />
          </ListItemButton>
          
          <ListItemButton>
            <ListItemIcon>
              <DirectionsBike />
            </ListItemIcon>
            <ListItemText primary={`Bike Distance: Cal`}/>
          </ListItemButton>
          
          <ListItemButton >
            <ListItemIcon>
              <Whatshot />
            </ListItemIcon>
            <ListItemText primary={`Bike Calories  Cal`} />
          </ListItemButton>
          
          <ListItemButton>
            <ListItemIcon>
              <Pool />
            </ListItemIcon>
            <ListItemText primary={`Swim Distance: Cal`}/>
          </ListItemButton>
          
          <ListItemButton >
            <ListItemIcon>
              <Whatshot />
            </ListItemIcon>
            <ListItemText primary={`Swim Calories  Cal`} />
          </ListItemButton>
          
        </List>
        
      </Stack>
      
      <DistanceDialog
        open={openDistanceDialog}
        setOpen={setDistanceDialog}
        distance={summary['total_distance']}
      />
      
    </>
    
  );
  
};

export default Summaries;

