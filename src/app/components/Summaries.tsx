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
import DistanceDialog from './Dialogs/DistanceDialog';
import SwimDialog from './Dialogs/SwimingDialog';


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
  const [distanceView, setDistanceView] = useState(0);
  const [openSwimDialog, setSwimDialog] = useState(false);
  
  
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
  
  const setMilestineDistance = (distanceType: string) => {
    // Set dialog open to true
    if (distanceType === 'swim') {
      setSwimDialog(true)
    } else {
      setDistanceDialog(true);  
    }
    
    // Set the viewDistance to the corresponding distance using switch statement
    switch (distanceType) {
      case 'run':
        setDistanceView(runSummary['total_distance']);
        break;
      case 'bike':
        setDistanceView(bikeSummary['total_distance']);
        break;
      case 'swim':
        setDistanceView(swimSummary['total_distance']);
        break;
      default:
        setDistanceView(0);
        break;
    }
  }
  
  
  
  return (
    
    <>
      <Stack direction="column">
        
        <Stack direction="row" spacing={3}>
          <Typography variant='h4'>Workout Stats</Typography>
          <Button variant="outlined" onClick={() => {getRunSummary()}}>Get Summary</Button>
        </Stack>
        
        <List>
          
          <ListItemButton onClick={() => {setMilestineDistance('run')}}>
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
          
          <ListItemButton onClick={() => {setMilestineDistance('bike')}}>
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
          
          <ListItemButton onClick={() => {setMilestineDistance('swim')}}>
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
        distance={distanceView}
      />
      
      <SwimDialog
        open={openSwimDialog}
        setOpen={setSwimDialog}
        distance={distanceView}
      />
      
    </>
    
  );
  
};

export default Summaries;

