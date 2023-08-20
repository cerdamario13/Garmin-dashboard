'use client'
import {
  LinearProgress,
  LinearProgressProps,
  Box,
  Typography,
  Stack
} from '@mui/material'

interface MilestoneProps {
  distance: number,
  cities: string,
  distanceCities: number,
}

const Milestone: React.FunctionComponent<MilestoneProps> = (props) => {
  
  function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  
  //logic if the user distance is greater than the milestone
  const distanceLogic = (userDistance: number, milestoneDistance: number) => {    
    if (userDistance >= milestoneDistance) {
      return 100;
    } else {
      return (userDistance / milestoneDistance) * 100;
    }
    
  }
  
  return (
    <>
      <LinearProgressWithLabel value={distanceLogic(props.distance, props.distanceCities)}  />
      <Stack direction="row" spacing={1}>
        
      <Typography variant="body1" >{props.cities}</Typography>
      <Typography variant="body1">{`${props.distance} - ${props.distanceCities}`}</Typography>
        
      </Stack>
    </>
  );
  
}

export default Milestone;