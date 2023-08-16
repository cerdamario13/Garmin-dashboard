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
  const [runSummary, setRunSummary] = useState({
    "total_distance": 0,
    "total_calories": 0
  });
  const [bikeSummary, setBikeSummary] = useState({
    total_distance: 0,
    total_calories: 0,
  });
  const [swimSummary, setSwimSummary] = useState({
    total_distance: 0,
    total_calories: 0
  })
  
  const [openDistanceDialog, setDistanceDialog] = useState(false);
  
  
  const getRunSummary = async () => {
    const url = new URL("http://127.0.0.1:5000/runSummaries");
    const response = await fetch(url.toString());
    const data = await response.json();
    console.log(data);
    
    const tempData = {...data};
    setRunSummary(tempData['runs']);
    setBikeSummary(tempData['bike_rides']);
    setSwimSummary(tempData['swims']);
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
            <ListItemText primary={`Run Distance: ${runSummary['total_distance']} Miles`} />
          </ListItemButton>
          
          <ListItemButton >
            <ListItemIcon>
              <Whatshot />
            </ListItemIcon>
            <ListItemText primary={`Run Calories ${runSummary['total_calories']} Cal`} />
          </ListItemButton>
          
          <ListItemButton>
            <ListItemIcon>
              <DirectionsBike />
            </ListItemIcon>
            <ListItemText primary={`Bike Distance: ${bikeSummary['total_distance']} Miles`}/>
          </ListItemButton>
          
          <ListItemButton >
            <ListItemIcon>
              <Whatshot />
            </ListItemIcon>
            <ListItemText primary={`Bike Calories: ${bikeSummary['total_calories']} Cal`} />
          </ListItemButton>
          
          <ListItemButton>
            <ListItemIcon>
              <Pool />
            </ListItemIcon>
            <ListItemText primary={`Swim Distance: ${swimSummary['total_distance']} Meters`}/>
          </ListItemButton>
          
          <ListItemButton >
            <ListItemIcon>
              <Whatshot />
            </ListItemIcon>
            <ListItemText primary={`Swim Calories: ${swimSummary['total_calories']}  Cal`} />
          </ListItemButton>
          
        </List>
        
      </Stack>
      
      <DistanceDialog
        open={openDistanceDialog}
        setOpen={setDistanceDialog}
        distance={runSummary['total_distance']}
      />
      
    </>
    
  );
  
};

export default Summaries;

